import { body } from 'express-validator'

const dataCheck = () => { 
    return [
        body('code').trim().not().isEmpty().withMessage 
        ('this field is required').isLength({min: 5, max: 5}).isInt().withMessage
        ('code must be 5 numeric characters'),
        body('title').trim().not().isEmpty().isString().withMessage
        ('please enter only letters').isLength({min: 3, max: 40}), 
        body('description').trim().not().isEmpty().isLength({min: 3, max: 150}).isString().withMessage
        ('please enter only characters'),
        body('status').optional().trim().isBoolean().withMessage
        ('status must be true or false'),
        body( 'stock' ).trim().not().isEmpty().isInt().withMessage
        ('please enter only numbers'),
        body( 'price' ).trim().not().isEmpty().isInt().withMessage
        ('please enter only numbers'),
        body( 'category' ).trim().not().isEmpty().isString().withMessage
        ('please enter only letters').isLength({min: 3, max: 40}),
        body('thumbnails').not().isArray().withMessage
        ('Thumbnails must be an array of URLs')
    ]
}

const updateCheck = () => { 
    return [
        body('code').optional().trim().isLength({min: 5, max: 5}).isInt().withMessage
        ('code must be 5 numeric characters'),
        body('title').optional().trim().isString().withMessage
        ('please enter only letters').isLength({min: 3, max: 40}), 
        body('description').optional().trim().not().isEmpty().isLength({min: 3, max: 150}).isString().withMessage
        ('please enter only characters'),
        body('status').optional().trim().isBoolean().withMessage
        ('status must be true or false'),
        body( 'stock' ).optional().trim().isInt().withMessage
        ('please enter only numbers'),
        body( 'price' ).optional().trim().isInt().withMessage
        ('please enter only numbers'),
        body( 'category' ).optional().trim().isString().withMessage
        ('please enter only letters').isLength({min: 3, max: 40}),
        body('thumbnails').optional().not().isArray().withMessage
        ('Thumbnails must be an array of URLs')
    ]
}

export { dataCheck, updateCheck}