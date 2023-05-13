export type UseInputType = String | string | Number | number | Date | undefined | null;

export default interface Config {
  allowNull?: Boolean;
  validator?: (str: UseInputType) => Boolean | boolean;
  onValidatorSuccess?: Function;
  onValidatorFail?: Function;
  parser?: (str: String|string) => UseInputType;
  asNumber?: Boolean | boolean;
  trim?: Boolean | boolean;
}