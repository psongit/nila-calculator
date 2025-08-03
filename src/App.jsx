import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({
    productItem: '', // name only
    stitchingCost: '',
    fabricCost: '',
    overheads: '',
    handling: '',
    shippingCharges: '',
    platformFeePercent: '',
    markupPercent: '',
  });
  // Calculate production cost immediately as inputs change
  const stitchingCost = parseFloat(inputs.stitchingCost) || 0;
  const fabricCost = parseFloat(inputs.fabricCost) || 0;
  const overheads = parseFloat(inputs.overheads) || 0;
  const handling = parseFloat(inputs.handling) || 0;
  const productionCost = stitchingCost + fabricCost + overheads + handling;

  // Calculate all results automatically
  const shippingCharges = parseFloat(inputs.shippingCharges) || 0;
  const platformFeePercent = parseFloat(inputs.platformFeePercent) || 0;
  const markupPercent = parseFloat(inputs.markupPercent) || 0;

  // Platform fee is a seller expense, not part of GST or selling price
  const platformFee = (productionCost + shippingCharges) * platformFeePercent / 100;
  // Selling price before GST (what customer pays before tax)
  const sellingPriceBeforeGST = productionCost + shippingCharges + (productionCost + shippingCharges) * (markupPercent / 100);
  // GST is on selling price before GST
  const gst = sellingPriceBeforeGST * 0.05;
  // Final selling price (customer pays this)
  const sellingPrice = sellingPriceBeforeGST + gst;
  // Gross cost is all expenses (production + shipping)
  const grossCost = productionCost + shippingCharges;
  // Profit is selling price minus all costs and platform fee
  const profit = sellingPrice - grossCost - platformFee;

  const results = {
    productionCost,
    shippingCharges,
    platformFee,
    grossCost,
    gst,
    sellingPrice,
    profit,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const clear = () => {
    setInputs({
      productItem: '',
      stitchingCost: '',
      fabricCost: '',
      overheads: '',
      handling: '',
      shippingCharges: '',
      platformFeePercent: '',
      markupPercent: '',
    });
  };

  return (
    <div className="container">
      <h2>Selling Price Calculator</h2>
      <div className="calculator">
        <div className="inputs">
          <label>Product Item: <input name="productItem" value={inputs.productItem} onChange={handleChange} type="text" placeholder="Name of product" /></label>
          <label>Stitching Cost (₹): <input name="stitchingCost" value={inputs.stitchingCost} onChange={handleChange} type="number" /></label>
          <label>Fabric Cost (₹): <input name="fabricCost" value={inputs.fabricCost} onChange={handleChange} type="number" /></label>
          <label>Overheads (₹): <input name="overheads" value={inputs.overheads} onChange={handleChange} type="number" /></label>
          <label>Handling (₹): <input name="handling" value={inputs.handling} onChange={handleChange} type="number" /></label>
          <label style={{fontWeight:'bold'}}>Production Cost (₹): <span>{productionCost.toFixed(2)}</span></label>
          <hr />
          <label>Shipping Charges (₹): <input name="shippingCharges" value={inputs.shippingCharges} onChange={handleChange} type="number" /></label>
          <label>Markup %: <input name="markupPercent" value={inputs.markupPercent} onChange={handleChange} type="number" /></label>
          <hr />
          <label>Platform Fee %: <input name="platformFeePercent" value={inputs.platformFeePercent} onChange={handleChange} type="number" /></label>
        </div>
        <div className="actions">
          <button onClick={clear}>Clear</button>
        </div>
        <div className="results" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
          <h3 style={{gridColumn:'span 2'}}>Results</h3>
          <div>Production Cost:</div><div>₹{results.productionCost.toFixed(2)}</div>
          <div>Shipping Cost (Free to customer):</div><div>₹{results.shippingCharges.toFixed(2)}</div>
          <div>Platform Fee:</div><div>₹{results.platformFee.toFixed(2)}</div>
          <div style={{gridColumn:'span 2'}}><hr /></div>
          <div>Gross Cost (All expenses):</div><div>₹{results.grossCost.toFixed(2)}</div>
          <div>GST (5%):</div><div>₹{results.gst.toFixed(2)}</div>
          <div style={{gridColumn:'span 2'}}><hr /></div>
          <div>Selling Price:</div><div>₹{results.sellingPrice.toFixed(2)}</div>
          <div style={{fontWeight:'bold'}}>Profit:</div><div style={{fontWeight:'bold'}}>₹{results.profit.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
