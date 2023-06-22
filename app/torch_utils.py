import io
import torch
import torchvision
import torchvision.datasets as datasets
import torchvision.transforms as transforms
import torch.nn as nn
from PIL import Image
import torchvision.models as models

num_classes = 196

model = models.resnet34(weights=True)
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, num_classes)
PATH = "app/car_weights.pth"
model.load_state_dict(torch.load(PATH , map_location=torch.device('cpu')))
model.eval()

def transform_image(image_bytes):
    transform = transforms.Compose([
        transforms.Resize((400, 400)),
        transforms.RandomResizedCrop(224),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    val_transforms = transforms.Compose([
        transforms.Resize((400, 400)),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    image = Image.open(io.BytesIO(image_bytes))
    return transform(image).unsqueeze(0)

def get_prediction(image_tensor):
    
    output = model(image_tensor)

    _, predicted = torch.max(output.data, 1)
    return predicted