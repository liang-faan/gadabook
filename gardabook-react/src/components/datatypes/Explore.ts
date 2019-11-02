export interface Props {
  classes: {
    [key: string]: string
  }
  vh: number
  getCatalogueList: Function
  catalogueList: Array<Catalogue>
}

interface Catalogue {
  [key: string]: any
}

export interface State {
  img: string
}
