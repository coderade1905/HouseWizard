import Input from '@mui/joy/Input';

function InputNumMin({data, setData, placeholder, value}) {
    return (
        <Input style={{width: "90px"}}  value={value === 0 ? '' : value} onChange={(e) => {if (Number(e.target.value) < 0) {return } else{setData({ ...data, min : Number(e.target.value) })}}} type="number"  placeholder={placeholder} />
    )
}
function InputNumMax({data, setData, placeholder, value}) {
    return (
        <Input style={{width: "90px"}}  value={value === 0 ? '' : value} onChange={(e) => {if (Number(e.target.value) < 0) {return } else{setData({ ...data, max : Number(e.target.value) })}}} type="number"  placeholder={placeholder} />
    )
}

export {InputNumMin, InputNumMax};