import Animal from './animal.model.js';

export const addAnimal =async (req,res) => {
    try {
        let data = req.body
        let animal = new Animal(data)
        await animal.save()

        return res.send({message: `Your pets was saved successfully, this is its name: ${animal.name}`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'general error with registering animal',error})
    }
}

export const listAnimal = async (req, res) => {
    try {
        const {limit=20, skip=0} = req.query

        let animals = await Animal.find()
        .skip(skip)
        .limit(limit)

        if(animals.length==0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Animal not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Animal found',animals
                
            }
        )

    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'general error listing animal',error})
    }
}

export const getAnimalById = async (req, res) => {
    try {
        let {id}=req.params
        let animal=await Animal.findById(id)
        if(!animal) return res.status(404).send(
            {
                success:false,
                message:'animal not found',
                animal
            }
        )
        
        return res.send(

            {
                success:true,
                message:'animal found',
                animal
            })
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'general error with getting an animal by id'},error)
    }
}

export const updateAnimal = async (req,res) => {
    try {
        let id=req.params.id
        let data=req.body
        let updateAnimal = await Animal.findByIdAndUpdate(id,data,{new:true})
        if(!updateAnimal) return res.status(404).send(
            {
                success:false,
                message:'animal not found',
                updateAnimal
            }
        )
        return res.send(

            {
                success:true,
                message:'updated animal',
                updateAnimal
            })
            
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success:true,
                message:'general error',
                error
            }
         )
    }
    
}

export const deleteAnimal = async (req,res) => {
    try {
        let id=req.params.id
        let deletedAnimal =await Animal.findByIdAndDelete(id)
        if(!deletedAnimal) return res.status(404).send(
            {
                success:false,
                message:'animal not found',
                deletedAnimal
            }
        )
        return res.send(

            {
                success:true,
                message:'deleted animal',
                deletedAnimal
            })
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success:true,
                message:'general error',
                error
            }
         )
    
    }
}
