import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const diseaseData = [
  {
    disease: "Apple Scab",
    supplement: "Tilt 250EC 200ml Propiconazole Syngenta Fungicide",
    image: "https://www.kissanghar.pk/assets/img/product/02391820221230158.jpg",
    link: "https://www.kissanghar.pk/product-details?name=Tilt-250ec-200ml-Propiconazole-Syngenta-Pakistan-Fungicide&c=1024"
  },
  {
    disease: "Apple Black Rot",
    supplement: "Azonil Fungicide 560SC 500ML",
    image: "https://www.kissanghar.pk/assets/img/product/32011520240917922.jpg",
    link: "https://www.kissanghar.pk/product-details?name=Azonil-Fungicide-560SC-500ML-for-all-crops-and-plants-New-chemistry-Azoxystrobin-+-Chlorothalonil-Zhengbang-Pakistan&c=1808"
  },
  {
    disease: "Apple Cedar Apple Rust",
    supplement: "Sulphur 80 Fmc Sulfer Fungicides",
    image: "https://www.kissanghar.pk/assets/img/product/26162020210725597.jpg",
    link: "https://www.kissanghar.pk/product-details?name=1kg-Sulphur-80%-Fmc-Sulfer-Fungicides-&c=434"
  },
  {
    disease: "Apple Healthy",
    supplement: "Ammonium Sulphate | Manuachar Amonium Salfate Amunium Nitrogen 21 Sulfur 24",
    image: "https://www.kissanghar.pk/assets/img/product/44031520241201548.jpg",
    link: "https://www.kissanghar.pk/product-details?name=Ammonium-Sulphate-50kg-(21-0-0+24s)-Manuachar-Amonium-Salfate-Amunium-Nitrogen-21-Sulfur-24-%D8%A7%D9%85%D9%88%D9%86%DB%8C%D9%85-%D8%B3%D9%84%D9%81%DB%8C%D9%B9&c=1896"
  },
  // ... Add more entries as needed from your CSV
];

export const PestDiseaseDetection = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Pest & Disease Detection</h2>
        <p className="text-muted-foreground">Find recommended supplements and solutions for common crop diseases</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diseaseData.map((item, idx) => (
          <Card key={idx} className="p-4 flex flex-col items-center bg-gradient-subtle border-border shadow-card">
            <img src={item.image} alt={item.disease} className="w-32 h-32 object-contain rounded mb-3 border" />
            <h3 className="text-lg font-semibold text-foreground mb-1 text-center">{item.disease}</h3>
            <p className="text-sm text-muted-foreground mb-2 text-center">Recommended: <span className="font-medium text-primary">{item.supplement}</span></p>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Buy Now</a>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PestDiseaseDetection; 