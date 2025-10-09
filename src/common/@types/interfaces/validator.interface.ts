export interface BaseValidator {
  required?: boolean;
  message?: string;
}

export interface BaseArrayValidator {
  arrayMaxSize?: number;
  arrayMinSize?: number;
  each?: boolean;
}

export interface DateFieldOptions extends BaseValidator, BaseArrayValidator {
  greaterThan?: boolean;
  lessThan?: boolean;
  date?: Date;
}

export interface NumberFieldOptions extends BaseValidator, BaseArrayValidator {
  min?: number;
  max?: number;
  int?: boolean;
  positive?: boolean;
}

export interface StringFieldOptions extends BaseValidator, BaseArrayValidator {
  trim?: boolean;
  regex?: RegExp;
  minLength?: number;
  maxLength?: number;
  sanitize?: boolean;
}

export interface FileValidator {
  fileType?: string[];
  fileSize?: number;
  required?: boolean;
}

export type MinMaxLengthOptions = Pick<
  StringFieldOptions,
  'each' | 'minLength' | 'maxLength'
>;

export type EnumFieldOptins = BaseValidator & BaseArrayValidator;
export type UUIDFieldOptions = EnumFieldOptins;
export type EmailFieldOptions = EnumFieldOptins;

export interface IsNestedFieldOptions
  extends Omit<BaseValidator, 'message'>,
    BaseArrayValidator {
  arrayMinSize: number;
  arrayMaxSize: number;
}
