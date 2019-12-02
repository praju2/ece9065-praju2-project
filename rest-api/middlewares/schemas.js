/*schemas.js */
//Start of Comment - Commented as instructed by TA for highlighting the sanitization or validation

// // load Joi module
// const Joi = require('joi');



// // accepts name only as letters and converts to uppercase
// const name1 = Joi.string().regex(/^[A-Z0-9]+$/);


// const itemSchema= Joi.object().keys({ 
//     id : Joi.string().alphanum(),
//     _id : Joi.string().alphanum(),
//     type : Joi.string().valid('Book', 'CD').required(),
//     name : Joi.string().max(100).regex(/^[ :'.\p{L}\p{N}]+$/u).required(),
//     publisher : Joi.string().max(100).regex(/^[ :.\p{L}\p{N}]+$/u).required(),
//     author : Joi.string().max(100).regex(/^[ :.\p{L}\p{N}]+$/u).required(),
//     edition : Joi.string().max(50).regex(/^[ :.\p{L}\p{N}]+$/u).required(),
//     copies : Joi.number().min(0).max(99).integer().required(),
//     image : Joi.string().uri().required(),
//     active : Joi.boolean().strict(),
//     nameObj : {
//         name_en :Joi.string().max(100).regex(/^[ :'.\p{L}\p{N}]+$/u).required(),
//         name_fr :Joi.string().max(100).regex(/^[ :'.\p{L}\p{N}]+$/u).required()
//     }
// }).or('id','_id');

// const itemSchemaOutput= Joi.object().keys({ 
//     id : Joi.string().alphanum(),
//     _id : Joi.string().alphanum(),
//     type : Joi.string().valid('Book', 'CD').required(),
//     name : Joi.string().max(100).regex(/^[ :'.\p{L}\p{N}]+$/u).required(),
//     publisher : Joi.string().max(100).regex(/^[ :.\p{L}\p{N}]+$/u).required(),
//     author : Joi.string().max(100).regex(/^[ :.\p{L}\p{N}]+$/u).required(),
//     edition : Joi.string().max(50).regex(/^[ :.\p{L}\p{N}]+$/u).required(),
//     copies : Joi.number().min(0).max(99).integer().required(),
//     image : Joi.string().uri().required(),
//     active : Joi.boolean().strict(),
//     name_lang_2 : Joi.string().max(100).regex(/^[ :'.\p{L}\p{N}]+$/u).required(),
//     __v :Joi.number().min(0)
// }).or('id','_id');

// const dueDateSchema= Joi.object().keys({ 
//     Book : Joi.number().min(0).max(99).integer().required(),
//     CD : Joi.number().min(0).max(99).integer().required(),
// });

// const dueDateSchemaOutput= Joi.object().keys({ 
//     _id : Joi.string().alphanum(),
//     Book : Joi.number().min(0).max(99).integer().required(),
//     CD : Joi.number().min(0).max(99).integer().required(),
//     __v :Joi.number().min(0)
// });

// // export the schemas
// module.exports = {
//     '/item': itemSchema,
//     '/dates' :dueDateSchema
// };

// module.exports.itemSchema=itemSchemaOutput;
// module.exports.dueDateSchema=dueDateSchemaOutput;

//End of Comment - Commented as instructed by TA for highlighting the sanitization or validation