

const ONLY_TEXT = { pattern: /^[A-Za-z]*$/, message: 'Does not contain numbers or special characters' };

const WITH_VIETNAMESE_NAME = { pattern: /^[A-Za-z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/, message: 'Does not contain numbers or special characters' };




const StringValidations = {
  ONLY_TEXT,
  WITH_VIETNAMESE_NAME,
};
export default StringValidations;
