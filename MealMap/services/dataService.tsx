// Data Service

class DataService {
    private baseUrl = "https://forava-service-tbqsewu5uq-uc.a.run.app" // should move to env vars

    constructor() {

    }

    private async handleResponse(response: Response) {
        console.log(response.text());
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong");
        }

        return response.json();
    }

    public async uploadImage(imageUri: string): Promise<any> {
        const formData = new FormData();
        const fileName = imageUri.split('/').pop() || 'photo.jpg';
        const fileType = fileName.split('.').pop() || 'image/jpeg'

        formData.append('image', {
            uri: imageUri,
            name: fileName,
            type: `image/${fileType}`,
        } as any);

        const response = await fetch(`${this.baseUrl}/generate-recipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
            .then(response => response.text())
            .then(data => {console.log('Recipe markfdown', data);})
            .catch(error => {console.error('Error uploading image', error.message)})

    }
}

export default DataService;