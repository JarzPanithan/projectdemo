'use strict';

import I18n from '../i18n/i18n';

const defaultMessages = {
  en: {
    numbers: I18n.t('error.numbers'),
    email: I18n.t('error.email'),
    required: I18n.t('error.required'),
    // date: I18n.t('error.date'),
    minlength: I18n.t('error.minlength'),
    maxlength: I18n.t('error.maxlength')
  },
  th: {
    numbers: I18n.t('error.numbers'),
    email: I18n.t('error.email'),
    require: I18n.t('error.require'),
    // date: I18n.t('error.date'),
    minlength: I18n.t('error.minlength'),
    maxlength: I18n.t('error.maxlength')
  },
};

// const defaultMessages = {
//   en: {
//     numbers: 'The field {0} must be a valid number.',
//     email: 'The field {0} must be a valid email address.',
//     required: 'The field {0} is mandatory.',
//     date: 'The field {0} must be a valid date ({1}).',
//     minlength: 'The field {0} length must be greater than {1}.',
//     maxlength: 'The field {0} length must be lower than {1}.'
//   },
//   th: {
//     numbers: 'ช่อง {0} จะต้องกรอกหมายเลขให้ถูกต้อง',
//     email: 'ช่อง {0} จะต้องกรอกอีเมล์ให้ถูกต้อง',
//     require: 'ช่อง {0} จำเป็นต้องกรอกลงไป',
//     date: 'ช่อง {0} จะต้องกรอกให้ถูกต้อง',
//     minlength: 'ช่อง {0} จะต้องกรอกหมายเลขไม่น้อยกว่า {1} ตัว.',
//     maxlength: 'ช้อง {0} จะต้องกรอกหมายเลขไม่มากกว่า {1} ตัว.'
//   },
// };

export default defaultMessages;