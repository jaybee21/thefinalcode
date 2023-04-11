
const typeSwitcherMap = new Map();
typeSwitcherMap.set('DVD', {
    formDescription: 'Please, provide disc space in MB(Megabyte)', formData: [{
        name: 'Size (MB)',
        id: 'size',
        type: 'number',
        required: true,
        errorMessage: 'Please, submit required data for Size'
    }
    ]
});
typeSwitcherMap.set('Book', {
    formDescription: 'Please provide weight in KG(kilogram)', formData: [{
        name: 'Weight (KG)',
        id: 'weight',
        type: 'number',
        required: true,
        errorMessage: 'Please, submit required data for Weight'
    },
    ]
});
typeSwitcherMap.set('Furniture', {
    formDescription: 'Please provide dimensions in HxWxL format', formData: [
        {
            name: 'Height',
            id: 'height',
            type: 'number',
            required: true,
            errorMessage: 'Please, submit required height for Furniture !'
        },
        {
            name: 'Width',
            id: 'width',
            type: 'number',
            required: true,
            validate: value => /^\d{10}$/.test(value),
            errorMessage: 'Please, submit required width for Furniture !'
        },
        {
            name: 'Length',
            id: 'length',
            type: 'number',
            required: true,
            validate: value => /^\d{10}$/.test(value),
            errorMessage: 'Please, submit required length for Furniture !'
        }
    ]
});
export default typeSwitcherMap;

