import React from 'react';

interface PropData {
    value: string;
    className: string;
    onChange: any;
    error: boolean;
    placeholder: string;
}

const MyInput: React.FC<PropData> = (props) => {
    const { value, onChange, className, error, placeholder } = props;
    return (
        <div>
            <input value={value} onChange={onChange} className={className} placeholder={placeholder} />
            {error && <div className='error'>Input {placeholder} value</div>}
        </div>
    )
}

export default MyInput;