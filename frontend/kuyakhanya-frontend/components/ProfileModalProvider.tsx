"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import type { Person } from "@/lib/people";
import ProfileModal from "./ProfileModal";

type ProfileModalCtx = {
  openProfile: (person: Person, profilePath: string) => void;
};

const Ctx = createContext<ProfileModalCtx>({ openProfile: () => {} });

export const useProfileModal = () => useContext(Ctx);

/** Link click handler: open the profile in-page instead of navigating. */
export function useOpenProfile(person: Person, profilePath: string) {
  const { openProfile } = useProfileModal();
  return useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      openProfile(person, profilePath);
    },
    [openProfile, person, profilePath]
  );
}

export default function ProfileModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [active, setActive] = useState<{
    person: Person;
    profilePath: string;
  } | null>(null);

  const openProfile = useCallback(
    (person: Person, profilePath: string) => setActive({ person, profilePath }),
    []
  );

  return (
    <Ctx.Provider value={{ openProfile }}>
      {children}
      {active && (
        <ProfileModal
          person={active.person}
          profilePath={active.profilePath}
          onClose={() => setActive(null)}
        />
      )}
    </Ctx.Provider>
  );
}
