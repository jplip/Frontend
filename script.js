document.getElementById('randomImageBtn').addEventListener('click', async () => {
    try {
      // Fetch the JSON file containing the URLs
      const response = await fetch('iconsURL.json');
      const data = await response.json();
  
      // Get a random image URL from the array
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomImageUrl = data[randomIndex];
  
      // Set the image source to the random URL
      document.getElementById('imageDisplay').src = randomImageUrl;
    } catch (error) {
      console.error('Error fetching or displaying image:', error);
    }
  });