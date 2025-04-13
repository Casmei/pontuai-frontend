"use client";

import { UserInfoResponse } from "@logto/next";
import { createContext, ReactNode, useContext } from "react";

interface UserProviderProps {
  children: ReactNode;
  user: UserInfoResponse;
}

const UserContext = createContext<UserInfoResponse | null>(null);

export function useUser(): UserInfoResponse {
  return useContext(UserContext)!; // Sei que o user sempre vai existir se estiver logado
}

export function UserProvider({ children, user }: UserProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
