export enum IAuthorizationPolicyConditionKind {
  VALUE = 'value',
  VALUE_OPERATOR_COMPARE_BINARY = 'binary_compare',
  VALUE_OPERATOR_UNARY = 'unary_operator',
}

export enum IAuthorizationPolicyConditionType {
  VALUE_LITERAL = 'v_literal',
  VALUE_BOOLEAN = 'v_boolean',
  VALUE_RESOURCE_ATTRIBUTE = 'v_resource_attribute',

  OPERATOR_UNARY_NOT = 'v_op_una_not',

  OPERATOR_UNARY_IS_NULL = 'v_op_una_is_null',
  OPERATOR_UNARY_IS_NOT_NULL = 'v_op_una_is_not_null',

  OPERATOR_BINARY_EQ = 'v_op_bin_eq',
  OPERATOR_BINARY_N_EQ = 'v_op_bin_n_eq',

  OPERATOR_BINARY_AND = 'v_op_bin_and',
  OPERATOR_BINARY_OR = 'v_op_bin_or',

  OPERATOR_BINARY_GT = 'v_op_bin_gt',
  OPERATOR_BINARY_GTE = 'v_op_bin_gte',

  OPERATOR_BINARY_LT = 'v_op_bin_lt',
  OPERATOR_BINARY_LTE = 'v_op_bin_lte',
}

export type IAuthorizationPolicyConditionValueLiteral = {
  kind: IAuthorizationPolicyConditionKind.VALUE;
  type: IAuthorizationPolicyConditionType.VALUE_LITERAL;
  value: any;
};

export type IAuthorizationPolicyConditionValueTrue = {
  kind: IAuthorizationPolicyConditionKind.VALUE;
  type: IAuthorizationPolicyConditionType.VALUE_BOOLEAN;
  value: true;
};

export type IAuthorizationPolicyConditionValueFalse = {
  kind: IAuthorizationPolicyConditionKind.VALUE;
  type: IAuthorizationPolicyConditionType.VALUE_BOOLEAN;
  value: false;
};

export type IAuthorizationPolicyConditionValueResourceAttribute = {
  kind: IAuthorizationPolicyConditionKind.VALUE;
  type: IAuthorizationPolicyConditionType.VALUE_RESOURCE_ATTRIBUTE;
  resource_alias: string;
  attribute: string;
};

export type IAuthorizationPolicyConditionValueNot = {
  kind: IAuthorizationPolicyConditionKind.VALUE_OPERATOR_UNARY;
  type: IAuthorizationPolicyConditionType.OPERATOR_UNARY_NOT;
  value: IAuthorizationPolicyConditionValue;
};

export type IAuthorizationPolicyConditionValueIsNull = {
  kind: IAuthorizationPolicyConditionKind.VALUE_OPERATOR_UNARY;
  type: IAuthorizationPolicyConditionType.OPERATOR_UNARY_IS_NULL;
  value: IAuthorizationPolicyConditionValue;
};

export type IAuthorizationPolicyConditionValueIsNotNull = {
  kind: IAuthorizationPolicyConditionKind.VALUE_OPERATOR_UNARY;
  type: IAuthorizationPolicyConditionType.OPERATOR_UNARY_IS_NOT_NULL;
  value: IAuthorizationPolicyConditionValue;
};

export type IAuthorizationPolicyConditionValueEq = {
  kind: IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY;
  type: IAuthorizationPolicyConditionType.OPERATOR_BINARY_EQ;
  left: IAuthorizationPolicyConditionValue;
  right: IAuthorizationPolicyConditionValue;
};

export type IAuthorizationPolicyConditionValueNEq = {
  kind: IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY;
  type: IAuthorizationPolicyConditionType.OPERATOR_BINARY_N_EQ;
  left: IAuthorizationPolicyConditionValue;
  right: IAuthorizationPolicyConditionValue;
};

export type IAuthorizationPolicyConditionValueAnd = {
  kind: IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY;
  type: IAuthorizationPolicyConditionType.OPERATOR_BINARY_AND;
  left: IAuthorizationPolicyConditionValue;
  right: IAuthorizationPolicyConditionValue;
};

export type IAuthorizationPolicyConditionValueOr = {
  kind: IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY;
  type: IAuthorizationPolicyConditionType.OPERATOR_BINARY_OR;
  left: IAuthorizationPolicyConditionValue;
  right: IAuthorizationPolicyConditionValue;
};

export type IAuthorizationPolicyConditionValueGreaterThan = {
  kind: IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY;
  type: IAuthorizationPolicyConditionType.OPERATOR_BINARY_GT;
  left: IAuthorizationPolicyConditionValue;
  right: IAuthorizationPolicyConditionValue;
};

export type IAuthorizationPolicyConditionValueGreaterThanOrEqual = {
  kind: IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY;
  type: IAuthorizationPolicyConditionType.OPERATOR_BINARY_GTE;
  left: IAuthorizationPolicyConditionValue;
  right: IAuthorizationPolicyConditionValue;
};

export type IAuthorizationPolicyConditionValueLessThan = {
  kind: IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY;
  type: IAuthorizationPolicyConditionType.OPERATOR_BINARY_LT;
  left: IAuthorizationPolicyConditionValue;
  right: IAuthorizationPolicyConditionValue;
};

export type IAuthorizationPolicyConditionValueLessThanOrEqual = {
  kind: IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY;
  type: IAuthorizationPolicyConditionType.OPERATOR_BINARY_LTE;
  left: IAuthorizationPolicyConditionValue;
  right: IAuthorizationPolicyConditionValue;
};

export type IAuthorizationPolicyConditionValue =
  | IAuthorizationPolicyConditionValueTrue
  | IAuthorizationPolicyConditionValueFalse
  | IAuthorizationPolicyConditionValueLiteral
  | IAuthorizationPolicyConditionValueResourceAttribute
  | IAuthorizationPolicyConditionValueEq
  | IAuthorizationPolicyConditionValueNEq
  | IAuthorizationPolicyConditionValueAnd
  | IAuthorizationPolicyConditionValueOr
  | IAuthorizationPolicyConditionValueNot
  | IAuthorizationPolicyConditionValueIsNull
  | IAuthorizationPolicyConditionValueIsNotNull
  | IAuthorizationPolicyConditionValueGreaterThan
  | IAuthorizationPolicyConditionValueGreaterThanOrEqual
  | IAuthorizationPolicyConditionValueLessThan
  | IAuthorizationPolicyConditionValueLessThanOrEqual;

export type IAuthorizationPolicyCondition = IAuthorizationPolicyConditionValue;
