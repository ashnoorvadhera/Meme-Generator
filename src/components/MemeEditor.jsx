import { useState, useRef, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';

function MemeEditor({ selectedMeme, goBack }) {
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [fontSize, setFontSize] = useState(32);
    const [fontFamily, setFontFamily] = useState('Impact');
    const canvasRef = useRef(null);

    const fonts = ['Impact', 'Arial', 'Comic Sans MS', 'Times New Roman'];

    // Draw on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = selectedMeme.blank;
        img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';

        // Top Text
        ctx.fillText(topText, canvas.width / 2, fontSize);
        ctx.strokeText(topText, canvas.width / 2, fontSize);

        // Bottom Text
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 10);
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 10);
        };
    }, [topText, bottomText, fontSize, fontFamily, selectedMeme]);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.download = 'my-meme.png';
        link.href = canvasRef.current.toDataURL();
        link.click();
    };

    return (
        <div className="min-h-screen bg-neutral-800 py-8 px-4 text-white">
        <div className="max-w-4xl mx-auto">
            {/* Top Controls */}
            <div className="flex justify-between items-center mb-6">
            <button
                onClick={goBack}
                className="bg-purple-400 hover:bg-purple-600 px-4 py-2 rounded-md text-black"
            >
                ← Back to Templates
            </button>
            <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-blue-400 hover:bg-blue-600 px-4 py-2 rounded-md text-black"
            >
                <FaDownload />
                Download Image
            </button>
            </div>

            {/* Input Controls */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md text-black mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                <label className="block text-sm font-medium mb-1">Top Text</label>
                <input
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-gray-400"
                    placeholder="Enter top text"
                />
                </div>
                <div>
                <label className="block text-sm font-medium mb-1">Bottom Text</label>
                <input
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-gray-400"
                    placeholder="Enter bottom text"
                />
                </div>
            </div>

            <div className="flex gap-4">
                <div>
                <label className="block text-sm font-medium mb-1">Font Size</label>
                <select
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="px-3 py-2 rounded border border-gray-400"
                >
                    {[24, 32, 40, 48, 64].map((size) => (
                    <option key={size} value={size}>
                        {size}px
                    </option>
                    ))}
                </select>
                </div>
                <div>
                <label className="block text-sm font-medium mb-1">Font Family</label>
                <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="px-3 py-2 rounded border border-gray-400"
                >
                    {fonts.map((font) => (
                    <option key={font} value={font}>
                        {font}
                    </option>
                    ))}
                </select>
                </div>
            </div>
            </div>

            {/* Canvas Preview */}
            <div className="bg-white p-4 rounded-lg flex justify-center">
            <canvas ref={canvasRef} className="max-w-full h-auto border border-gray-300 rounded" />
            </div>
        </div>
        </div>
    );
}

export default MemeEditor;
