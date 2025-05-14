import { useEffect, useRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import MemeEditor from './components/MemeEditor.jsx'; 
import GradientText from './components/GradientText.jsx';


function App() {

  const [selectedMeme, setSelectedMeme] = useState(null);

  const [memes, setMemes] = useState([]);

  const fileInputRef = useRef(null);

  const memeGenerator = () => {
    fetch("https://api.memegen.link/templates")
      .then(res => res.json())
      .then(data => {
        setMemes(data);
      })
      .catch(error => console.error('Error fetching memes:', error));
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedMeme({blank: e.target.result}, {name: "Custom Upload"});
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(()=>{
    memeGenerator()
  }, [])


  return (
    <>
      {selectedMeme ? (
        <MemeEditor 
          selectedMeme={selectedMeme} 
          goBack={() => setSelectedMeme(null)} 
        />
      ) : (
        <div className='min-h-screen bg-gradient-to-br from-blue-950 via-black to-neutral-900
        bg-neutral-900' >
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
          >
            Meme Generator
          </GradientText>
          <div className='flex justify-center items-center gap-36 h-28 w-full'>
            <button className="flex items-center gap-2 bg-blue-300 text-black px-4 py-2 rounded-md cursor-pointer"
              onClick={() => fileInputRef.current.click()}  >
              <FaUpload />
              Upload Image
            </button>
            <input type='file' accept='image/*' ref={fileInputRef} className='hidden' onChange={fileChangeHandler} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 sm:p-8 md:p-12">
            {memes.map((meme) => (
              <img 
                key={meme.id}
                src={meme.blank}
                alt={meme.name}
                className="w-full h-auto aspect-square object-cover rounded-lg cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
                onClick={() => setSelectedMeme(meme)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );


}

export default App
