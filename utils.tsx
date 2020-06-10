import { linksRef } from './constants'

export const getLinkForRef = (ref: string) => {
  return linksRef
    .doc(ref)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let data: any = doc.data()
        console.log(data)
        return data.url
      } else {
        console.log("Doesn't exist!")
        return '/404'
      }
    })
}
