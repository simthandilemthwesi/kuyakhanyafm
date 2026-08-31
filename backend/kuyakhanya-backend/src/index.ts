import type { Core } from '@strapi/strapi';

// Roles to create (free-tier, no EE)
// Super Admin is built-in. We create the 4 custom roles + Editor.
const CUSTOM_ROLES = [
  {
    name: 'Station Manager',
    description: 'Overall station oversight — can manage all content, publish, and manage users.',
    permissions: ['programme', 'presenter', 'management-team', 'technician', 'vision-mission', 'aims-objectives', 'contact-info'],
  },
  {
    name: 'Media Manager',
    description: 'Manages media, programmes, and presenters. Handles Cloudinary uploads.',
    permissions: ['programme', 'presenter', 'management-team', 'technician'],
  },
  {
    name: 'Editor',
    description: 'Can create / update / publish editorial content (Vision, Aims, Contact Info).',
    permissions: ['vision-mission', 'aims-objectives', 'contact-info', 'programme', 'presenter'],
  },
  {
    name: 'Presenter',
    description: 'Limited — can update own presenter profile and view assigned programmes.',
    permissions: ['presenter', 'programme'],
  },
];

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // ── 1. Create / update custom roles ───────────────────────────────
    try {
      for (const roleDef of CUSTOM_ROLES) {
        const existing = await strapi.db.query('admin::role').findOne({ where: { name: roleDef.name } });
        if (!existing) {
          await strapi.db.query('admin::role').create({
            data: {
              name: roleDef.name,
              description: roleDef.description,
              code: roleDef.name.toLowerCase().replace(/\s+/g, '-'),
            },
          });
          strapi.log.info(`[bootstrap] Created role: ${roleDef.name}`);
        }
      }
    } catch (err) {
      strapi.log.warn(`[bootstrap] Roles step skipped: ${err}`);
    }

    // ── 2. Ensure Public can read published content ───────────────────
    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
      if (publicRole) {
        const permissionsToEnable = [
          'api::programme.programme.find',
          'api::programme.programme.findOne',
          'api::presenter.presenter.find',
          'api::presenter.presenter.findOne',
          'api::management-team.management-team.find',
          'api::management-team.management-team.findOne',
          'api::technician.technician.find',
          'api::technician.technician.findOne',
          'api::vision-mission.vision-mission.find',
          'api::aims-objectives.aims-objectives.find',
          'api::contact-info.contact-info.find',
        ];
        for (const action of permissionsToEnable) {
          await strapi.db.query('plugin::users-permissions.permission').updateMany({
            where: { role: publicRole.id, action },
            data: { enabled: true },
          });
        }
        // Fallback: if permissions don't exist yet, create is not needed — Strapi auto creates on load.
        strapi.log.info('[bootstrap] Public read permissions enabled');
      }
    } catch (err) {
      strapi.log.warn(`[bootstrap] Public permissions step skipped: ${err}`);
    }

    // ── 3. Seed single-types & management data if empty ───────────────
    try {
      // Vision & Mission
      const vmCount = await strapi.db.query('api::vision-mission.vision-mission').count({});
      // singleType count is 0 or 1; we query findMany instead
      const vm = await strapi.entityService.findMany('api::vision-mission.vision-mission' as any, {});
      if (!vm) {
        await strapi.entityService.create('api::vision-mission.vision-mission' as any, {
          data: {
            vision: 'To be the light of hope and transformation in Thembalethu and beyond, shining the love of God through radio broadcasting, inspiring positive change, and uniting the community to walk in truth, purpose, and spiritual growth.',
            missionItems: [
              'To spread the light of Christ to those living in spiritual darkness, bringing encouragement, faith, and restoration.',
              'To provide uplifting music, inspiring messages, and community-driven programs that empower individuals and families.',
              'To be a voice of unity, hope, and transformation, helping people discover their God-given potential.',
              'To create a platform that promotes local talent, culture, and testimonies of God\'s goodness.',
            ],
            publishedAt: new Date(),
          },
        });
        strapi.log.info('[bootstrap] Seeded Vision & Mission');
      }

      // Aims & Objectives
      const ao = await strapi.entityService.findMany('api::aims-objectives.aims-objectives' as any, {});
      if (!ao) {
        await strapi.entityService.create('api::aims-objectives.aims-objectives' as any, {
          data: {
            title: 'Aims & Objectives',
            objectives: [
              'To serve as a platform of spiritual empowerment for the Thembalethu community.',
              'To promote local talent, creativity, and culture through radio programming.',
              'To create opportunities for dialogue, education, and positive social change.',
              'To encourage youth development through skills training, mentorship, and exposure.',
              'To build strong partnerships with churches, organizations, and the wider community to shine brighter together.',
            ],
            publishedAt: new Date(),
          },
        });
        strapi.log.info('[bootstrap] Seeded Aims & Objectives');
      }

      // Contact Info
      const ci = await strapi.entityService.findMany('api::contact-info.contact-info' as any, {});
      if (!ci) {
        await strapi.entityService.create('api::contact-info.contact-info' as any, {
          data: {
            phone: '0639780839',
            whatsapp: '0639780839',
            email: 'info.kuyakhanyafm@gmail.com',
            address: 'Thembalethu, George, Western Cape, South Africa',
            facebook: 'https://www.facebook.com/profile.php?id=61580413033664',
            instagram: 'https://www.instagram.com/kuyakhanyafm/',
            youtube: 'https://www.youtube.com/@KuyakhanyaFM',
            tiktok: 'https://www.tiktok.com/@kuyakhanyafm',
            whatsappLink: 'https://wa.me/27639780839',
            googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScFijWKgFqrUr-etsbtSrym6_u1N13CTSPnoH9kwibxtNYyjw/viewform?embedded=true',
            publishedAt: new Date(),
          },
        });
        strapi.log.info('[bootstrap] Seeded Contact Info');
      }

      // Management team seed (only if empty)
      const mtCount = await strapi.db.query('api::management-team.management-team').count({});
      if (mtCount === 0) {
        const managers = [
          { name: 'Mr Mzoxolo Panduva', role: 'Managing Director', bio: 'Leads overall strategy and community engagement for KUYAKHANYA FM.', order: 1 },
          { name: 'Mr Zolani Fulani', role: 'Station Manager', bio: 'Oversight of programming content and mission alignment.', order: 2 },
          { name: 'Mr Simthandile Mthwesi', role: 'Media Manager', bio: 'Marketing & sponsorship coordination, media management.', order: 3 },
        ];
        for (const m of managers) {
          await strapi.entityService.create('api::management-team.management-team' as any, {
            data: { ...m, publishedAt: new Date() },
          });
        }
        strapi.log.info('[bootstrap] Seeded Management Team');
      }

      // Technician
      const techCount = await strapi.db.query('api::technician.technician').count({});
      if (techCount === 0) {
        await strapi.entityService.create('api::technician.technician' as any, {
          data: {
            name: 'Mr Anthon Skweyiya',
            role: 'Senior Technician',
            bio: 'Ensures all technical aspects of broadcasts run smoothly and maintains broadcasting equipment.',
            publishedAt: new Date(),
          },
        });
        strapi.log.info('[bootstrap] Seeded Technician');
      }
    } catch (err) {
      strapi.log.warn(`[bootstrap] Seed step skipped: ${err}`);
    }

    strapi.log.info('[bootstrap] Kuyakhanya FM v2 bootstrap complete');
  },
};
