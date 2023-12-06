import { IAnyIterable } from '../IAnyIterable';
import { IAuthorizationPolicy } from './IAuthorizationPolicy';

export type IAuthorizationPoliciesIterable<TargetActor = unknown> = IAnyIterable<IAuthorizationPolicy<TargetActor>>;
