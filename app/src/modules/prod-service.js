import { ProdTypeEnum } from './prod-types'


export default class ProdService {

    getProductTypes() {

        let prodTypes = [];

        for (var prop in ProdTypeEnum) {

            if (ProdTypeEnum.hasOwnProperty(prop)) {
                prodTypes.push({
                    id: ProdTypeEnum[prop],
                    name: prop.toString()
                })
            }
            
        }

        return prodTypes;
    }
}