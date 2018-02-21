class Worker {
    constructor(
        name,
        type,
        breed,
        purchaseDate,
        eggColor,
        workerType,
        imageURL,
        gender

    )
    {
        this.name = name;
        this.type = type;
        this.breed = breed;
        this.purchaseDate = new Date(purchaseDate);
        this.eggColor = eggColor;
        this.workerType = workerType;
        this.imageURL = imageURL;
        this.gender = gender;
    }
}

export default Worker;