import { IAnyIterable } from '../IAnyIterable';
import { IAuthorizationPolicy } from './IAuthorizationPolicy';
import { IAuthorizationPolicyAttachedConstraint } from './IAuthorizationPolicyAttachedConstraint';

export interface IAuthorizationPoliciesManager<AuthorizationPolicy extends IAuthorizationPolicy = IAuthorizationPolicy> {
  addPolicy(policy: AuthorizationPolicy): Promise<void>;
  addPolicies(policies: IAnyIterable<AuthorizationPolicy>): Promise<void>;

  getOrderedPolicies(): AsyncIterable<AuthorizationPolicy>;

  buildAttachedConstraints(): AsyncIterable<IAuthorizationPolicyAttachedConstraint>;
}
