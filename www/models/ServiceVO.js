/**
 * Class representing a service
 * gathered from server
 */
class ServiceVO {
    
    //function to parse available services to partner services. It goes to this.myServices
    getServices(ownedServices, allServices){
        let whatToOffer = [];
        //#1 - iterate categories
        allServices.forEach((category)=>{
            //#2 - create category header
            let newCategory = {
                name: category.categoryName,
                location: 'in/out',//TODO
                totalPickedItems : 0,//TODO
                totalPriceItems : 0,//TODO
                subCategories : []
            }

            //#3 - iterate subcategories to add to category
            category.subCategories.forEach((subCategory)=>{   
                //#4 - create sub-category header
                let newSubCategory = {
                    subCategoryName : subCategory.subCategoryName,
                    numberOfPicked : 0,//TODO
                    pricePicked : 0,//TODO
                    options : []
                }

                //#5 - iterate services to add to subcategory
                subCategory.services.forEach((service)=>{
                    //#6 - create service item to add to subcategory
                    let newService = {
                        optionId: service.id_service,
                        optionLabel : service.name_service,
                        optionPrice : parseFloat(service.price),
                        optionSelected : false
                    }

                    //#7 - Add it to subcategory options list (if professional has it)
                    newSubCategory.options.push(newService);
                })

                //#8 - Push SubCategory to Category if it has options (services)
                if(newSubCategory.options.length > 0){
                    newCategory.subCategories.push(newSubCategory);
                }

            });

            //#9 - Push category to 'What to offer' if category has subcategories
            if(newCategory.subCategories.length > 0){
                whatToOffer.push(newCategory);
            }
        });

        //#10 - Finaly, set as 'myServices'
        this.myServices = whatToOffer;

    };

    //function to get price from picked services
    getTotalPriceFromPickedService(){
		let totalPriceServices = 0;

		//#1 - Iterate each service to get info 
		this.myServices.forEach((service)=>{
			totalPriceServices += service.totalPriceItems;
		})
        return totalPriceServices;
    }

    //function to get the number of picked services
    getTotalServicesPicked(){
		let totalServices = 0;

		//#1 - Iterate each service to get info 
		this.myServices.forEach((service)=>{
			totalServices += service.totalPickedItems;
		})
        return totalServices;
    }
       
        

    //function to acquired picked services (used in booking)
    getPickedServices(){
        let whatIsPicked = [];
        //#1 - iterate categories
        this.myServices.forEach((category)=>{            
            //#2 - iterate subcategories
            category.subCategories.forEach((subCategory)=>{                  
                //#3 - iterate services to check witch ones are picked
                subCategory.options.forEach((service)=>{
                    //#4 - push it if picked
                    if(service.optionSelected){
                        whatIsPicked.push(service.optionId);
                    }
                })
            });

        });

        //#10 - Finaly, return what is picked
        return whatIsPicked;

    };

    constructor() {
       
        this.id = 0;
        this.name = '';    
        this.email = '';
        this.phone = '';
        this.address1 = '';
        this.location = ''; //[in, out, in/out]
        this.rating = '';
        this.skills = {
            nails : false,
            body : false,
            hair : false,
            treatment : false
        };
        this.coords = {
            latitude: 0,
            longitude: 0
        };
        this.picture = 'assets/dev-pics/default-user.png';

        this.myServices = [];

        this.date = '';
        this.hour = '';
        this.status = '';
        
        this.isFavorite = false;
    }
}


