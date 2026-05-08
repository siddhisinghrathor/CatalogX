const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src/data/products.json');
let data = JSON.parse(fs.readFileSync(p, 'utf-8'));

data = data.map((item, idx) => {
  // Add random realistic data based on category
  let price = 0;
  let highlights = [];
  let features = [];
  
  if (item.category === 'Cars') {
    price = Math.floor(Math.random() * 50000) + 30000;
    highlights = ['0-60 in 3.5s', 'Level 2 Autonomy', 'Premium Audio'];
    features = ['Heated Seats', 'Panoramic Roof', 'Apple CarPlay'];
    if (!item.itemprops.find(p => p.label === 'Top Speed')) {
      item.itemprops.push({ label: 'Top Speed', value: (Math.floor(Math.random() * 80) + 120) + ' mph' });
    }
  } else if (item.category === 'Phones') {
    price = Math.floor(Math.random() * 800) + 500;
    highlights = ['120Hz Display', 'All-day Battery', 'Pro Camera System'];
    features = ['5G Ready', 'Water Resistant', 'Wireless Charging'];
    if (!item.itemprops.find(p => p.label === 'Speed')) {
      item.itemprops.push({ label: 'Processor', value: 'Octa-core 3.2GHz' });
    }
  } else if (item.category === 'Computers') {
    price = Math.floor(Math.random() * 1500) + 1000;
    highlights = ['Desktop-class Performance', 'Mini-LED Display', 'Studio Mics'];
    features = ['Thunderbolt 4', 'Wi-Fi 6E', 'Mechanical Keyboard'];
    if (!item.itemprops.find(p => p.label === 'Clock Speed')) {
      item.itemprops.push({ label: 'Clock Speed', value: 'Up to 5.4GHz' });
    }
  } else if (item.category === 'Bikes') {
    price = Math.floor(Math.random() * 15000) + 5000;
    highlights = ['Quickshifter+', 'Cornering ABS', 'TFT Display'];
    features = ['Slipper Clutch', 'Traction Control', 'Ride Modes'];
    if (!item.itemprops.find(p => p.label === 'Top Speed')) {
      item.itemprops.push({ label: 'Top Speed', value: (Math.floor(Math.random() * 50) + 150) + ' mph' });
    }
  }

  // Ensure every item has price
  item.price = '$' + price.toLocaleString();
  item.highlights = highlights;
  item.features = features;

  return item;
});

fs.writeFileSync(p, JSON.stringify(data, null, 2));
console.log('Successfully updated products.json');
