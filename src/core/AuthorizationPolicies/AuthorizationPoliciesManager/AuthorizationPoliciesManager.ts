import { IAnyIterable, IAuthorizationPoliciesManager, IAuthorizationPolicy, IAuthorizationPolicyAttachedConstraint } from '../../../domain';
import { AuthorizationPolicyHandler } from '../AuthorizationPolicyHandler';

export class AuthorizationPoliciesManager<
  TargetActor = unknown,
  AuthorizationPolicy extends IAuthorizationPolicy<TargetActor> = IAuthorizationPolicy<TargetActor>,
> implements IAuthorizationPoliciesManager<AuthorizationPolicy>
{
  #attachedPolicies = new Set<AuthorizationPolicy>();

  async addPolicy(policy: AuthorizationPolicy) {
    this.#attachedPolicies.add(policy);
  }

  async addPolicies(policies: IAnyIterable<AuthorizationPolicy>) {
    for await (const policy of policies) {
      await this.addPolicy(policy);
    }
  }

  async *getOrderedPolicies(): AsyncIterable<AuthorizationPolicy> {
    yield* Array.from(this.#attachedPolicies).sort((a, b) => b.priority - a.priority);
  }

  async *buildAttachedConstraints(): AsyncIterable<IAuthorizationPolicyAttachedConstraint<TargetActor>> {
    for await (const policy of this.getOrderedPolicies()) {
      const attachedConstraints = await AuthorizationPolicyHandler.buildAttachedConstraints(policy);

      yield* attachedConstraints;
    }
  }
}
