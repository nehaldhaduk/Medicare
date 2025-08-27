import { useState } from 'react'
import Layout from '../components/Layout'

const medicineDatabase = {
  paracetamol: {
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    dosage: '500mg-1000mg every 4-6 hours',
    maxDaily: '4000mg per day',
    uses: 'Pain relief, fever reduction',
    sideEffects: 'Rare: nausea, rash, liver damage (overdose)',
    warnings: 'Do not exceed recommended dose. Avoid alcohol.',
    category: 'Analgesic/Antipyretic'
  },
  ibuprofen: {
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    dosage: '200mg-400mg every 4-6 hours',
    maxDaily: '1200mg per day (OTC)',
    uses: 'Pain relief, inflammation, fever reduction',
    sideEffects: 'Stomach upset, heartburn, dizziness',
    warnings: 'Take with food. Avoid if allergic to NSAIDs.',
    category: 'NSAID'
  },
  amoxicillin: {
    name: 'Amoxicillin',
    genericName: 'Amoxicillin',
    dosage: '250mg-500mg every 8 hours',
    maxDaily: 'As prescribed by doctor',
    uses: 'Bacterial infections',
    sideEffects: 'Nausea, diarrhea, allergic reactions',
    warnings: 'Complete full course. Inform doctor of allergies.',
    category: 'Antibiotic'
  },
  cetirizine: {
    name: 'Cetirizine',
    genericName: 'Cetirizine HCl',
    dosage: '10mg once daily',
    maxDaily: '10mg per day',
    uses: 'Allergies, hay fever, hives',
    sideEffects: 'Drowsiness, dry mouth, fatigue',
    warnings: 'May cause drowsiness. Avoid alcohol.',
    category: 'Antihistamine'
  },
  aspirin: {
    name: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    dosage: '75mg-325mg daily (low dose)',
    maxDaily: '4000mg per day (pain relief)',
    uses: 'Pain relief, heart protection, stroke prevention',
    sideEffects: 'Stomach irritation, bleeding risk',
    warnings: 'Not for children under 16. Take with food.',
    category: 'NSAID/Antiplatelet'
  },
  omeprazole: {
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    dosage: '20mg once daily',
    maxDaily: '40mg per day',
    uses: 'Acid reflux, stomach ulcers, GERD',
    sideEffects: 'Headache, nausea, diarrhea',
    warnings: 'Take before meals. Long-term use monitoring needed.',
    category: 'Proton Pump Inhibitor'
  },
  ors: {
    name: 'ORS',
    genericName: 'Oral Rehydration Solution',
    dosage: '1 sachet in 200ml water',
    maxDaily: 'As needed for dehydration',
    uses: 'Dehydration, diarrhea, electrolyte replacement',
    sideEffects: 'Rare: nausea if too concentrated',
    warnings: 'Use clean water. Discard after 24 hours.',
    category: 'Electrolyte Solution'
  },
  metformin: {
    name: 'Metformin',
    genericName: 'Metformin HCl',
    dosage: '500mg-1000mg twice daily',
    maxDaily: '2000mg per day',
    uses: 'Type 2 diabetes management',
    sideEffects: 'Nausea, diarrhea, metallic taste',
    warnings: 'Take with meals. Monitor kidney function.',
    category: 'Antidiabetic'
  },
  salbutamol: {
    name: 'Salbutamol',
    genericName: 'Albuterol',
    dosage: '2 puffs every 4-6 hours as needed',
    maxDaily: 'As prescribed (usually max 8 puffs/day)',
    uses: 'Asthma, bronchospasm, COPD',
    sideEffects: 'Tremor, palpitations, headache',
    warnings: 'Rinse mouth after use. Seek help if overused.',
    category: 'Bronchodilator'
  },
  'vitamin d': {
    name: 'Vitamin D',
    genericName: 'Cholecalciferol',
    dosage: '1000-2000 IU daily',
    maxDaily: '4000 IU per day',
    uses: 'Bone health, immune support, vitamin D deficiency',
    sideEffects: 'Rare: nausea, weakness (overdose)',
    warnings: 'Monitor blood levels with high doses.',
    category: 'Vitamin Supplement'
  }
}

export default function MedicineInfo() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMedicine, setSelectedMedicine] = useState(null)
  const [suggestions, setSuggestions] = useState([])

  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term.length > 0) {
      const filtered = Object.keys(medicineDatabase).filter(key =>
        key.toLowerCase().includes(term.toLowerCase()) ||
        medicineDatabase[key].name.toLowerCase().includes(term.toLowerCase())
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const selectMedicine = (key) => {
    setSelectedMedicine(medicineDatabase[key])
    setSearchTerm(medicineDatabase[key].name)
    setSuggestions([])
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold">
            <i className="fas fa-search me-3 text-primary"></i>
            Medicine Information
          </h1>
          <p className="text-muted">Search for detailed information about medicines</p>
        </div>

        <div className="search-container">
          <div className="position-relative">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search medicine (e.g., Paracetamol, Ibuprofen...)"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <i className="fas fa-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
            
            {suggestions.length > 0 && (
              <div className="list-group position-absolute w-100 mt-1" style={{ zIndex: 1000 }}>
                {suggestions.map(key => (
                  <button
                    key={key}
                    className="list-group-item list-group-item-action"
                    onClick={() => selectMedicine(key)}
                  >
                    <i className="fas fa-pills me-2 text-primary"></i>
                    {medicineDatabase[key].name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedMedicine && (
          <div className="medicine-info mt-5">
            <div className="card medicine-card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">
                  <i className="fas fa-pills me-2"></i>
                  {selectedMedicine.name}
                </h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h5><i className="fas fa-tag me-2 text-info"></i>Generic Name</h5>
                    <p>{selectedMedicine.genericName}</p>
                    
                    <h5><i className="fas fa-prescription-bottle me-2 text-success"></i>Dosage</h5>
                    <p>{selectedMedicine.dosage}</p>
                    
                    <h5><i className="fas fa-calendar-day me-2 text-warning"></i>Maximum Daily Dose</h5>
                    <p>{selectedMedicine.maxDaily}</p>
                  </div>
                  <div className="col-md-6">
                    <h5><i className="fas fa-heartbeat me-2 text-danger"></i>Uses</h5>
                    <p>{selectedMedicine.uses}</p>
                    
                    <h5><i className="fas fa-exclamation-triangle me-2 text-warning"></i>Side Effects</h5>
                    <p>{selectedMedicine.sideEffects}</p>
                    
                    <h5><i className="fas fa-shield-alt me-2 text-info"></i>Warnings</h5>
                    <p>{selectedMedicine.warnings}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="badge bg-secondary fs-6">
                    <i className="fas fa-layer-group me-1"></i>
                    {selectedMedicine.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!selectedMedicine && (
          <div className="row mt-5">
            <div className="col-12">
              <h4 className="text-center mb-4">Available Medicines</h4>
              <div className="row g-3">
                {Object.keys(medicineDatabase).map(key => (
                  <div key={key} className="col-md-4 col-sm-6">
                    <div 
                      className="card h-100 border-0 shadow-sm cursor-pointer"
                      onClick={() => selectMedicine(key)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body text-center">
                        <i className="fas fa-pills fa-2x text-primary mb-3"></i>
                        <h6>{medicineDatabase[key].name}</h6>
                        <small className="text-muted">{medicineDatabase[key].category}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}