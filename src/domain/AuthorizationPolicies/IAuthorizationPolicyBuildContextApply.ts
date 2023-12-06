export interface IAuthorizationPolicyBuildContextApply {
  for_roles(roles: string[] | string): void;
  for_authed_user(): void;
  for_everyone(): void;
}
