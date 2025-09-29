import React, { useState } from 'react';
export default function App() {
  const [tableOrders, setTableOrders] = useState({});
  const [currentTable, setCurrentTable] = useState(null);
  const [orderMessage, setOrderMessage] = useState("");


  const menuItems = {
    'South Indian Specials': [
      {
        name: 'Masala Dosa',
        description: 'Crispy rice and lentil crepe with spiced potato filling, served with sambhar and chutneys',
        price: 180,
        image: "images/masaladose.png"
      },
      {
        name: 'Idli Sambhar',
        description: 'Steamed rice cakes served with lentil curry and coconut chutney (4 pieces)',
        price: 120,
        image: "images/idle.png"
      },
      {
        name: 'Vada Sambhar',
        description: 'Crispy lentil donuts served with sambhar and chutneys (3 pieces)',
        price: 140,
        image: "images/vada.png"
      },
      {
        name: 'Uttapam',
        description: 'Thick pancake topped with onions, tomatoes, and coriander',
        price: 160,
        image: "images/uttapam.png"
      },
      {
        name: 'Rava Kesari',
        description: 'Traditional semolina sweet garnished with cashews and raisins',
        price: 80,
        image: "images/Ravakesri.png"
      }
    ],
    'Rice & Curries': [
      {
        name: 'Hyderabadi Biryani',
        description: 'Aromatic basmati rice with tender mutton, served with raita and shorba',
        price: 380,
        image: "images/biryani.png"
      },
      {
        name: 'Chicken Chettinad',
        description: 'Spicy South Indian chicken curry with coconut and traditional spices',
        price: 320,
        image: "images/chicken.png"
      },
      {
        name: 'Fish Curry',
        description: 'Kerala style fish curry with coconut milk and curry leaves',
        price: 280,
        image: "images/fish.png"
      },
      {
        name: 'Dal Tadka',
        description: 'Yellow lentils tempered with cumin, garlic, and spices',
        price: 180,
        image:"images/dal.png"
      }
    ],
    'Continental': [
      {
        name: 'Margherita Pizza',
        description: 'Fresh basil, mozzarella, and tomato sauce on thin crust',
        price: 420,
        image: 'images/margerita.jpeg'
      },
      {
        name: 'Farmhouse Pizza',
        description: 'Creamy pasta with grilled chicken breast and parmesan',
        price: 380,
        image: 'images/farmhouse.jpeg'
      },
      {
        name: 'Panner Pizza',
        description: 'Grilled chicken with lettuce, tomato, and mayo, served with fries',
        price: 280,
        image: 'images/paneer.jpeg'
      }
    ],
    'Ice creams': [
      {
        name: 'Falooda',
        description: 'Soft milk dumplings in sugar syrup (3 pieces)',
        price: 120,
        image: 'images/falooda.jpg'
      },
      {
        name: 'Death By Chocolate',
        description: 'Rich chocolate brownie with vanilla ice cream',
        price: 180,
        image: 'images/polar.jpeg'
      },
      {
        name: 'GudBud',
        description: 'Traditional Indian ice cream with cardamom and pistachios',
        price: 100,
        image: 'images/gudbud.jpeg'
      }
    ],
    'Cakes': [
      {
        name: 'Butterscotch',
        description: 'Soft milk dumplings in sugar syrup (3 pieces)',
        price: 120,
        image: 'images/butterscotch.jpg'
      },
      {
        name: 'Fresh Fruit',
        description: 'Rich chocolate brownie with vanilla ice cream',
        price: 180,
        image: 'images/fresh-fruit-cake.png'
      },
      {
        name: 'Oreo',
        description: 'Traditional Indian ice cream with cardamom and pistachios',
        price: 100,
        image: 'images/oreo.jpeg'
      }
    ]
  }

  const categoryEmojis = {
    'South Indian Specials': '🥥',
    'Rice & Curries': '🍛',
    'Continental': '🍕',
    'Ice creams': '🧊',
    'Cakes': '🍰'
  };

  const changeTable = (tableNumber) => {
    if (tableNumber) {
      setCurrentTable(tableNumber);
      setTableOrders(prev => ({
        ...prev,
        [tableNumber]: prev[tableNumber] || {}
      }));
    } else {
      setCurrentTable(null);
    }
  };

  const addToOrder = (itemName, price) => {
    if (!currentTable) {
      alert('Please select a table first!');
      return;
    }

    setTableOrders(prev => {
      const currentTableOrders = prev[currentTable] || {};
      const currentQuantity = currentTableOrders[itemName]?.quantity || 0;
      
      return {
        ...prev,
        [currentTable]: {
          ...currentTableOrders,
          [itemName]: {
            price: price,
            quantity: currentQuantity + 1
          }
        }
      };
    });
  };

  const updateQuantity = (itemName, change) => {
    if (!currentTable || !tableOrders[currentTable]?.[itemName]) return;

    const newQuantity = tableOrders[currentTable][itemName].quantity + change;
    
    if (newQuantity <= 0) {
      setTableOrders(prev => {
        const newOrder = { ...prev[currentTable] };
        delete newOrder[itemName];
        return {
          ...prev,
          [currentTable]: newOrder
        };
      });
    } else {
      setTableOrders(prev => ({
        ...prev,
        [currentTable]: {
          ...prev[currentTable],
          [itemName]: {
            ...prev[currentTable][itemName],
            quantity: newQuantity
          }
        }
      }));
    }
  };

  const calculateTotal = () => {
    if (!currentTable || !tableOrders[currentTable]) return 0;
    
    return Object.values(tableOrders[currentTable]).reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlaceOrder = () => {
    if (!currentTable) return;

    // Clear the current table's orders
    setTableOrders((prev) => ({
      ...prev,
      [currentTable]: {}
    }));

    // Show success message
    setOrderMessage("✅ Your order has been placed!");
    
    // Hide message after a few seconds
    setTimeout(() => {
      setOrderMessage("");
    }, 3000);
  };


  return (
    <div className="min-h-screen bg-gray-50">
    
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors"
            >
              🍛 Spice Junction
            </button>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-pink-600 font-medium transition-colors">Home</button>
              <button onClick={() => scrollToSection('menu')} className="text-gray-700 hover:text-pink-600 font-medium transition-colors">Menu</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-pink-600 font-medium transition-colors">About</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-pink-600 font-medium transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </nav>

  
      <section id="home" className="h-screen relative flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')`
          }}
        ></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            Welcome to Spice Junction
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
            Authentic South Indian Flavors & Continental Delights
          </p>
          <button 
            onClick={() => scrollToSection('menu')}
            className="bg-gradient-to-r from-pink-600 to-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-700 hover:to-pink-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Our Menu
          </button>
        </div>
      </section>

  
      <section id="menu" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
        
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-8 mb-10 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">🪑 Select Your Table Number</h3>
            <select 
              value={currentTable || ''}
              onChange={(e) => changeTable(e.target.value)}
              className="w-64 px-6 py-4 border-2 border-gray-200 rounded-xl text-lg bg-white focus:outline-none focus:border-pink-500 transition-colors"
            >
              <option value="">Choose a table...</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>Table {i + 1}</option>
              ))}
            </select>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
        
            <div className="lg:col-span-2">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Delicious Menu</h2>
                
                {Object.entries(menuItems).map(([category, items]) => (
                  <div key={category} className="mb-10">
                    <h3 className="text-2xl font-semibold text-pink-600 mb-6 pb-3 border-b-2 border-pink-100 flex items-center gap-3">
                      <span>{categoryEmojis[category]}</span>
                      {category}
                    </h3>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.name} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                          <div className="flex justify-between items-center gap-10">
                             <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-28 h-28 rounded-2xl object-cover shadow-md"
                              />
                            <div className="flex-1">
                              <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h4>
                              <p className="text-gray-600 mb-3 leading-relaxed">{item.description}</p>
                              <p className="text-2xl font-bold text-green-600">₹{item.price}</p>
                            </div>
                            <button 
                              onClick={() => addToOrder(item.name, item.price)}
                              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                            >
                              {currentTable && tableOrders[currentTable]?.[item.name]?.quantity ? 
                                `Add + ${tableOrders[currentTable][item.name].quantity}` : 
                                'Add +'
                              }
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

    
            <div className="2xl:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Order</h2>
                  
                  <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white p-5 rounded-2xl mb-6 text-center font-semibold text-lg">
                    {currentTable ? `Table ${currentTable}` : 'Please select a table first'}
                  </div>

                

    {/* ✅ Success message */}
    {orderMessage && (
      <div className="text-center text-green-600 font-semibold mb-4">
        {orderMessage}
      </div>
    )}

                  <div className="space-y-4 mb-6">
                    {currentTable && tableOrders[currentTable] && Object.keys(tableOrders[currentTable]).length > 0 ? (
                      Object.entries(tableOrders[currentTable]).map(([itemName, itemData]) => (
                        <div key={itemName} className="flex justify-between items-center py-4 border-b border-gray-200 last:border-b-0">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800">{itemName}</div>
                            <div className="text-sm text-gray-500">₹{itemData.price} each</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => updateQuantity(itemName, -1)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold transition-colors"
                            >
                              -
                            </button>
                            <span className="font-bold text-lg w-8 text-center">{itemData.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(itemName, 1)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold transition-colors"
                            >
                              +
                            </button>
                            <div className="font-bold text-green-600 ml-3">
                              ₹{itemData.price * itemData.quantity}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 italic py-8">
                        No items selected yet
                      </div>
                    )}
                  </div>

                  <div className="pt-5 border-t-2 border-gray-200 flex justify-center items-center gap-2 ">
                    <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-4 rounded-2xl text-center w-30">
                      <div className="text-xl font-bold text-gray-800">
                        Total: ₹{calculateTotal()}
                      </div>
                    </div>
                  <div 
                    onClick={handlePlaceOrder}
                    className="cursor-pointer bg-gradient-to-r from-pink-100 to-pink-200 p-4 rounded-2xl text-center"
                  >
                    <div className="text-xl font-bold text-gray-800">
                      Place order
                    </div>
                  </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  
      <section id="about" className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About Spice Junction</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Experience the authentic flavors of South India combined with continental favorites. 
            Our passion for quality ingredients and traditional cooking methods ensures every dish 
            is a culinary journey that delights your senses.
          </p>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-lg text-gray-600 mb-4">Visit us today for an unforgettable dining experience!</p>
          <p className="text-gray-600">📍 123 Food Street, Mysuru, Karnataka | 📞 +91 12345 67890</p>
        </div>
      </section>
    </div>
  );
}