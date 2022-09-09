    //function to format createdAt date value
const dateFormat = (timestamp) => {
    const dateObj = new Date(timestamp);
    const date = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const time = dateObj.toLocaleTimeString('en-US')
    return `${date} at ${time}`
}

module.exports = dateFormat;