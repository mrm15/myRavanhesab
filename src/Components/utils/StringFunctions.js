function addStr(str, index, stringToAdd) {
    return (
        str.substring(0, index) +
        stringToAdd +
        str.substring(index, str.length)
    );
}


const  str ={
    addStr
}
export default  str