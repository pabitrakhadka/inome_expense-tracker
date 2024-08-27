// import NepaliDate from 'nepali-datetime';
export const nepaliDateConveter = (datetime) => {

    return new Date(datetime).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
}
