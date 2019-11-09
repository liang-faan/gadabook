export interface Props {
  classes: {
    [key: string]: string
  }
  vh: number
  getBookingList: Function
  bookingList: Array<Booking>
}

interface Booking {
  [key: string]: any
}

export interface State {}
