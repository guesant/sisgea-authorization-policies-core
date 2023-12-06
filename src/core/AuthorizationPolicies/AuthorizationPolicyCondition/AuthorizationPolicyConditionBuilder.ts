import * as ConditionTypes from '../../../domain/AuthorizationPolicies/IAuthorizationPolicyCondition';

export class Builder {
  static Literal(value: any): ConditionTypes.IAuthorizationPolicyConditionValueLiteral {
    return {
      kind: ConditionTypes.IAuthorizationPolicyConditionKind.VALUE,
      type: ConditionTypes.IAuthorizationPolicyConditionType.VALUE_LITERAL,
      value,
    };
  }

  static True(): ConditionTypes.IAuthorizationPolicyConditionValueTrue {
    return {
      kind: ConditionTypes.IAuthorizationPolicyConditionKind.VALUE,
      type: ConditionTypes.IAuthorizationPolicyConditionType.VALUE_BOOLEAN,
      value: true,
    };
  }

  static False(): ConditionTypes.IAuthorizationPolicyConditionValueFalse {
    return {
      kind: ConditionTypes.IAuthorizationPolicyConditionKind.VALUE,
      type: ConditionTypes.IAuthorizationPolicyConditionType.VALUE_BOOLEAN,
      value: false,
    };
  }

  static Boolean(value: boolean) {
    return value ? Builder.True() : Builder.False();
  }

  static ResourceAttribute(resource_alias: string, attribute: string): ConditionTypes.IAuthorizationPolicyConditionValueResourceAttribute {
    return {
      kind: ConditionTypes.IAuthorizationPolicyConditionKind.VALUE,
      type: ConditionTypes.IAuthorizationPolicyConditionType.VALUE_RESOURCE_ATTRIBUTE,
      resource_alias,
      attribute,
    };
  }

  static Not(
    condition: ConditionTypes.IAuthorizationPolicyCondition,
  ):
    | ConditionTypes.IAuthorizationPolicyConditionValueNot
    | ConditionTypes.IAuthorizationPolicyConditionValueTrue
    | ConditionTypes.IAuthorizationPolicyConditionValueFalse {
    if (condition.type === ConditionTypes.IAuthorizationPolicyConditionType.VALUE_BOOLEAN) {
      return Builder.Boolean(!condition.value);
    }

    return {
      kind: ConditionTypes.IAuthorizationPolicyConditionKind.VALUE_OPERATOR_UNARY,
      type: ConditionTypes.IAuthorizationPolicyConditionType.OPERATOR_UNARY_NOT,
      value: condition,
    };
  }

  static Eq(
    left: ConditionTypes.IAuthorizationPolicyConditionValue,
    right: ConditionTypes.IAuthorizationPolicyConditionValue,
  ): ConditionTypes.IAuthorizationPolicyConditionValueEq {
    return {
      kind: ConditionTypes.IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY,
      type: ConditionTypes.IAuthorizationPolicyConditionType.OPERATOR_BINARY_EQ,
      left,
      right,
    };
  }

  static NEq(
    left: ConditionTypes.IAuthorizationPolicyConditionValue,
    right: ConditionTypes.IAuthorizationPolicyConditionValue,
  ): ConditionTypes.IAuthorizationPolicyConditionValueNEq {
    return {
      kind: ConditionTypes.IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY,
      type: ConditionTypes.IAuthorizationPolicyConditionType.OPERATOR_BINARY_N_EQ,
      left,
      right,
    };
  }

  static And(
    left: ConditionTypes.IAuthorizationPolicyConditionValue,
    right: ConditionTypes.IAuthorizationPolicyConditionValue,
  ): ConditionTypes.IAuthorizationPolicyConditionValueAnd {
    return {
      kind: ConditionTypes.IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY,
      type: ConditionTypes.IAuthorizationPolicyConditionType.OPERATOR_BINARY_AND,
      left,
      right,
    };
  }

  static Or(
    left: ConditionTypes.IAuthorizationPolicyConditionValue,
    right: ConditionTypes.IAuthorizationPolicyConditionValue,
  ): ConditionTypes.IAuthorizationPolicyConditionValueOr {
    return {
      kind: ConditionTypes.IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY,
      type: ConditionTypes.IAuthorizationPolicyConditionType.OPERATOR_BINARY_OR,
      left,
      right,
    };
  }

  static Gt(
    left: ConditionTypes.IAuthorizationPolicyConditionValue,
    right: ConditionTypes.IAuthorizationPolicyConditionValue,
  ): ConditionTypes.IAuthorizationPolicyConditionValueGreaterThan {
    return {
      kind: ConditionTypes.IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY,
      type: ConditionTypes.IAuthorizationPolicyConditionType.OPERATOR_BINARY_GT,
      left,
      right,
    };
  }

  static Gte(
    left: ConditionTypes.IAuthorizationPolicyConditionValue,
    right: ConditionTypes.IAuthorizationPolicyConditionValue,
  ): ConditionTypes.IAuthorizationPolicyConditionValueGreaterThanOrEqual {
    return {
      kind: ConditionTypes.IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY,
      type: ConditionTypes.IAuthorizationPolicyConditionType.OPERATOR_BINARY_GTE,
      left,
      right,
    };
  }

  static Lt(
    left: ConditionTypes.IAuthorizationPolicyConditionValue,
    right: ConditionTypes.IAuthorizationPolicyConditionValue,
  ): ConditionTypes.IAuthorizationPolicyConditionValueLessThan {
    return {
      kind: ConditionTypes.IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY,
      type: ConditionTypes.IAuthorizationPolicyConditionType.OPERATOR_BINARY_LT,
      left,
      right,
    };
  }

  static Lte(
    left: ConditionTypes.IAuthorizationPolicyConditionValue,
    right: ConditionTypes.IAuthorizationPolicyConditionValue,
  ): ConditionTypes.IAuthorizationPolicyConditionValueLessThanOrEqual {
    return {
      kind: ConditionTypes.IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY,
      type: ConditionTypes.IAuthorizationPolicyConditionType.OPERATOR_BINARY_LTE,
      left,
      right,
    };
  }

  static CombineOr(left: ConditionTypes.IAuthorizationPolicyCondition | null, right: ConditionTypes.IAuthorizationPolicyCondition | null) {
    if (left === null && right === null) {
      return Builder.False();
    }

    if (right === null) {
      return left;
    }

    if (left === null) {
      return right;
    }

    if (
      left.type === ConditionTypes.IAuthorizationPolicyConditionType.VALUE_BOOLEAN &&
      right.type === ConditionTypes.IAuthorizationPolicyConditionType.VALUE_BOOLEAN
    ) {
      return Builder.Boolean(left.value || right.value);
    }

    return Builder.Or(left, right);
  }

  static CombineAnd(left: ConditionTypes.IAuthorizationPolicyCondition | null, right: ConditionTypes.IAuthorizationPolicyCondition | null) {
    if (left === null && right === null) {
      return Builder.False();
    }

    if (right === null) {
      return left;
    }

    if (left === null) {
      return right;
    }

    if (
      left.type === ConditionTypes.IAuthorizationPolicyConditionType.VALUE_BOOLEAN &&
      right.type === ConditionTypes.IAuthorizationPolicyConditionType.VALUE_BOOLEAN
    ) {
      return Builder.Boolean(left.value && right.value);
    }

    return Builder.And(left, right);
  }
}
