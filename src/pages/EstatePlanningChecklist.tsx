import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Heart, FileText, Users, Shield, Home, Phone, Calendar, Archive, Sparkles, Check } from 'lucide-react';

interface ChecklistItem {
  id: string;
  number: string;
  task: string;
  hasInput?: boolean;
  inputPlaceholder?: string;
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

const EstatePlanningChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleInput = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  const ChecklistTable = ({ section, startNumber = 1 }: { section: ChecklistSection; startNumber?: number }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="bg-[#E8B4B8] -mx-6 -mt-6 px-6 py-3 mb-6 rounded-t-lg">
        <h3 className="text-[#4A3C28] font-semibold uppercase tracking-wider text-sm">{section.title}</h3>
      </div>
      <div className="space-y-4">
        {section.items.map((item, index) => (
          <div key={item.id} className="flex items-start gap-4 pb-3 border-b border-[#F0E6E0]">
            <span className="text-[#8B7355] font-medium w-8">{startNumber + index}.</span>
            <div className="flex-1">
              <p className="text-[#4A3C28] text-sm leading-relaxed">{item.task}</p>
              {item.hasInput && (
                <input
                  type="text"
                  placeholder={item.inputPlaceholder}
                  value={formData[item.id] || ''}
                  onChange={(e) => handleInput(item.id, e.target.value)}
                  className="mt-2 w-full border-b border-[#D4C4B0] bg-transparent pb-1 text-sm text-[#4A3C28] placeholder:text-[#C4B5A0] focus:border-[#8B7355] focus:outline-none"
                />
              )}
            </div>
            <Checkbox
              checked={checkedItems[item.id] || false}
              onCheckedChange={() => handleCheck(item.id)}
              className="mt-0.5 border-[#8B7355] data-[state=checked]:bg-[#E8B4B8] data-[state=checked]:border-[#E8B4B8]"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FBF7F4] print:bg-[#FBF7F4]">
      {/* Print Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        
        @media print {
          body { background: #FBF7F4 !important; }
          .no-print { display: none !important; }
          .pdf-page { 
            page-break-after: always;
            height: 100vh;
            display: flex;
            flex-direction: column;
          }
          .pdf-page:last-child { page-break-after: auto; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          input { 
            border-bottom: 1px solid #D4C4B0 !important; 
            background: transparent !important;
          }
        }
      `}</style>

      {/* Download Button - Hidden during print */}
      <div className="no-print fixed top-4 right-4 z-50">
        <Button 
          onClick={handlePrint}
          className="bg-[#E8B4B8] hover:bg-[#D9A5A9] text-white shadow-lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Page 1: Cover */}
      <div className="pdf-page min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <div className="flex justify-center gap-8 mb-12">
            <FileText className="w-12 h-12 text-[#E8B4B8]" strokeWidth={1} />
            <Heart className="w-12 h-12 text-[#E8B4B8]" strokeWidth={1} />
            <Shield className="w-12 h-12 text-[#E8B4B8]" strokeWidth={1} />
          </div>
          
          <h1 className="text-7xl text-[#4A3C28] mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Estate Planning
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-20 h-px bg-[#D4C4B0]"></div>
            <Sparkles className="w-5 h-5 text-[#E8B4B8]" />
            <div className="w-20 h-px bg-[#D4C4B0]"></div>
          </div>
          
          <h2 className="text-2xl text-[#8B7355] uppercase tracking-[0.3em]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            Checklist
          </h2>
          
          <div className="mt-16 flex justify-center gap-8">
            <Users className="w-12 h-12 text-[#E8B4B8]" strokeWidth={1} />
            <Home className="w-12 h-12 text-[#E8B4B8]" strokeWidth={1} />
            <Calendar className="w-12 h-12 text-[#E8B4B8]" strokeWidth={1} />
          </div>
        </div>
      </div>

      {/* Page 2: Essential Legal Documents */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-8 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Getting Started
        </h2>
        
        <ChecklistTable 
          section={{
            title: "Essential Legal Documents",
            items: [
              { id: "will", number: "1", task: "Create or update my will", hasInput: true, inputPlaceholder: "Date completed" },
              { id: "will-location", number: "2", task: "Store will in secure location", hasInput: true, inputPlaceholder: "Location" },
              { id: "executor", number: "3", task: "Name executor(s)", hasInput: true, inputPlaceholder: "Name(s)" },
              { id: "poa-financial", number: "4", task: "Designate financial power of attorney", hasInput: true, inputPlaceholder: "Name" },
              { id: "poa-medical", number: "5", task: "Designate medical power of attorney", hasInput: true, inputPlaceholder: "Name" },
              { id: "trust", number: "6", task: "Consider setting up a trust", hasInput: true, inputPlaceholder: "Type/Status" },
            ]
          }}
        />
        
        <div className="mt-8">
          <ChecklistTable 
            section={{
              title: "Healthcare Directives",
              items: [
                { id: "living-will", number: "7", task: "Complete living will/advance directive", hasInput: true, inputPlaceholder: "Date" },
                { id: "dnr", number: "8", task: "Decide on DNR preferences", hasInput: true, inputPlaceholder: "Yes/No" },
                { id: "organ", number: "9", task: "Document organ donation wishes", hasInput: true, inputPlaceholder: "Yes/No" },
                { id: "healthcare-proxy", number: "10", task: "Appoint healthcare proxy", hasInput: true, inputPlaceholder: "Name" },
              ]
            }}
            startNumber={7}
          />
        </div>
      </div>

      {/* Page 3: Financial Planning */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-8 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Financial Planning
        </h2>
        
        <ChecklistTable 
          section={{
            title: "Beneficiary Designations",
            items: [
              { id: "life-insurance", number: "11", task: "Update life insurance beneficiaries", hasInput: true, inputPlaceholder: "Policy #" },
              { id: "retirement", number: "12", task: "Update 401(k)/IRA beneficiaries", hasInput: true, inputPlaceholder: "Account #" },
              { id: "bank", number: "13", task: "Add beneficiaries to bank accounts", hasInput: true, inputPlaceholder: "Bank name" },
              { id: "investment", number: "14", task: "Update investment account beneficiaries", hasInput: true, inputPlaceholder: "Account #" },
              { id: "pension", number: "15", task: "Review pension beneficiaries", hasInput: true, inputPlaceholder: "Plan name" },
            ]
          }}
          startNumber={11}
        />
        
        <div className="mt-8">
          <ChecklistTable 
            section={{
              title: "Financial Information",
              items: [
                { id: "accounts-list", number: "16", task: "List all bank accounts", hasInput: true, inputPlaceholder: "Number of accounts" },
                { id: "debts", number: "17", task: "Document outstanding debts", hasInput: true, inputPlaceholder: "Total amount" },
                { id: "assets", number: "18", task: "Inventory valuable assets", hasInput: true, inputPlaceholder: "Categories" },
                { id: "safe-deposit", number: "19", task: "Document safe deposit box location", hasInput: true, inputPlaceholder: "Bank & box #" },
                { id: "financial-advisor", number: "20", task: "Share advisor contact info", hasInput: true, inputPlaceholder: "Name & phone" },
              ]
            }}
            startNumber={16}
          />
        </div>
      </div>

      {/* Page 4: Family & Personal */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-8 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Family & Personal
        </h2>
        
        <ChecklistTable 
          section={{
            title: "Guardian & Childcare Plans",
            items: [
              { id: "guardian", number: "21", task: "Name guardian for minor children", hasInput: true, inputPlaceholder: "Name(s)" },
              { id: "guardian-backup", number: "22", task: "Name backup guardian", hasInput: true, inputPlaceholder: "Name(s)" },
              { id: "pet-care", number: "23", task: "Arrange pet care", hasInput: true, inputPlaceholder: "Caretaker name" },
              { id: "childcare-funds", number: "24", task: "Set aside childcare funds", hasInput: true, inputPlaceholder: "Amount/Location" },
            ]
          }}
          startNumber={21}
        />
        
        <div className="mt-8">
          <ChecklistTable 
            section={{
              title: "Personal Wishes",
              items: [
                { id: "funeral", number: "25", task: "Document funeral preferences", hasInput: true, inputPlaceholder: "Burial/Cremation" },
                { id: "funeral-home", number: "26", task: "Pre-arrange with funeral home", hasInput: true, inputPlaceholder: "Name" },
                { id: "obituary", number: "27", task: "Write obituary outline", hasInput: true, inputPlaceholder: "Status" },
                { id: "memorial", number: "28", task: "Specify memorial preferences", hasInput: true, inputPlaceholder: "Type" },
                { id: "charity", number: "29", task: "List charitable donation wishes", hasInput: true, inputPlaceholder: "Organizations" },
              ]
            }}
            startNumber={25}
          />
        </div>
      </div>

      {/* Page 5: Digital & Documentation */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-8 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Digital & Documentation
        </h2>
        
        <ChecklistTable 
          section={{
            title: "Digital Legacy",
            items: [
              { id: "passwords", number: "30", task: "Create password manager account", hasInput: true, inputPlaceholder: "Service name" },
              { id: "social-media", number: "31", task: "Document social media accounts", hasInput: true, inputPlaceholder: "Platforms" },
              { id: "email", number: "32", task: "List important email accounts", hasInput: true, inputPlaceholder: "Primary email" },
              { id: "digital-assets", number: "33", task: "Inventory digital assets", hasInput: true, inputPlaceholder: "Types" },
              { id: "online-accounts", number: "34", task: "List subscription services", hasInput: true, inputPlaceholder: "Count" },
            ]
          }}
          startNumber={30}
        />
        
        <div className="mt-8">
          <ChecklistTable 
            section={{
              title: "Document Storage",
              items: [
                { id: "documents-location", number: "35", task: "Organize important documents", hasInput: true, inputPlaceholder: "Location" },
                { id: "copies", number: "36", task: "Make copies of key documents", hasInput: true, inputPlaceholder: "Status" },
                { id: "trusted-person", number: "37", task: "Share location with trusted person", hasInput: true, inputPlaceholder: "Name" },
                { id: "emergency-contacts", number: "38", task: "Create emergency contact list", hasInput: true, inputPlaceholder: "Updated date" },
                { id: "review-schedule", number: "39", task: "Schedule annual review", hasInput: true, inputPlaceholder: "Month" },
              ]
            }}
            startNumber={35}
          />
        </div>
      </div>

      {/* Page 6: Insurance & Property */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-8 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Insurance & Property
        </h2>
        
        <ChecklistTable 
          section={{
            title: "Insurance Policies",
            items: [
              { id: "health-insurance", number: "40", task: "Document health insurance details", hasInput: true, inputPlaceholder: "Provider & Policy #" },
              { id: "life-insurance-details", number: "41", task: "List life insurance policies", hasInput: true, inputPlaceholder: "Companies" },
              { id: "disability", number: "42", task: "Note disability insurance", hasInput: true, inputPlaceholder: "Provider" },
              { id: "long-term-care", number: "43", task: "Document long-term care insurance", hasInput: true, inputPlaceholder: "Policy #" },
              { id: "auto-insurance", number: "44", task: "List auto insurance details", hasInput: true, inputPlaceholder: "Provider" },
            ]
          }}
          startNumber={40}
        />
        
        <div className="mt-8">
          <ChecklistTable 
            section={{
              title: "Property & Assets",
              items: [
                { id: "real-estate", number: "45", task: "List all real estate owned", hasInput: true, inputPlaceholder: "Properties" },
                { id: "mortgage", number: "46", task: "Document mortgage information", hasInput: true, inputPlaceholder: "Lender" },
                { id: "vehicle-titles", number: "47", task: "Organize vehicle titles", hasInput: true, inputPlaceholder: "Vehicles" },
                { id: "valuables", number: "48", task: "Inventory valuable items", hasInput: true, inputPlaceholder: "Categories" },
                { id: "business-interests", number: "49", task: "Document business ownership", hasInput: true, inputPlaceholder: "Business names" },
              ]
            }}
            startNumber={45}
          />
        </div>
      </div>

      {/* Page 7: Professional Contacts */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-8 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Professional Contacts
        </h2>
        
        <ChecklistTable 
          section={{
            title: "Key Professionals",
            items: [
              { id: "attorney", number: "50", task: "Estate attorney", hasInput: true, inputPlaceholder: "Name & Phone" },
              { id: "accountant", number: "51", task: "Accountant/CPA", hasInput: true, inputPlaceholder: "Name & Phone" },
              { id: "financial-planner", number: "52", task: "Financial planner", hasInput: true, inputPlaceholder: "Name & Phone" },
              { id: "insurance-agent", number: "53", task: "Insurance agent", hasInput: true, inputPlaceholder: "Name & Phone" },
              { id: "doctor", number: "54", task: "Primary care physician", hasInput: true, inputPlaceholder: "Name & Phone" },
              { id: "employer", number: "55", task: "Employer HR contact", hasInput: true, inputPlaceholder: "Name & Phone" },
            ]
          }}
          startNumber={50}
        />
        
        <div className="mt-8">
          <ChecklistTable 
            section={{
              title: "Family Communication",
              items: [
                { id: "family-meeting", number: "56", task: "Schedule family meeting", hasInput: true, inputPlaceholder: "Date" },
                { id: "wishes-discussion", number: "57", task: "Discuss wishes with family", hasInput: true, inputPlaceholder: "Completed" },
                { id: "questions", number: "58", task: "Address family questions", hasInput: true, inputPlaceholder: "Topics" },
                { id: "location-shared", number: "59", task: "Share document locations", hasInput: true, inputPlaceholder: "With whom" },
                { id: "annual-review", number: "60", task: "Plan annual review together", hasInput: true, inputPlaceholder: "Month" },
              ]
            }}
            startNumber={56}
          />
        </div>
      </div>

      {/* Page 8: Notes & Additional Items */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-8 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Notes & Reminders
        </h2>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="bg-[#E8B4B8] -mx-6 -mt-6 px-6 py-3 mb-6 rounded-t-lg">
            <h3 className="text-[#4A3C28] font-semibold uppercase tracking-wider text-sm">Additional Notes</h3>
          </div>
          
          <div className="space-y-4">
            <div className="border-b border-[#F0E6E0] pb-3">
              <label className="text-[#8B7355] text-sm font-medium">Important Dates to Remember:</label>
              <textarea 
                className="mt-2 w-full h-20 border border-[#D4C4B0] rounded-md p-2 text-sm text-[#4A3C28] resize-none focus:border-[#8B7355] focus:outline-none"
                placeholder="Annual review dates, policy renewals, etc."
              />
            </div>
            
            <div className="border-b border-[#F0E6E0] pb-3">
              <label className="text-[#8B7355] text-sm font-medium">Special Instructions:</label>
              <textarea 
                className="mt-2 w-full h-20 border border-[#D4C4B0] rounded-md p-2 text-sm text-[#4A3C28] resize-none focus:border-[#8B7355] focus:outline-none"
                placeholder="Any specific wishes or instructions..."
              />
            </div>
            
            <div className="border-b border-[#F0E6E0] pb-3">
              <label className="text-[#8B7355] text-sm font-medium">Family Contacts:</label>
              <textarea 
                className="mt-2 w-full h-20 border border-[#D4C4B0] rounded-md p-2 text-sm text-[#4A3C28] resize-none focus:border-[#8B7355] focus:outline-none"
                placeholder="Important family member contact information..."
              />
            </div>
            
            <div>
              <label className="text-[#8B7355] text-sm font-medium">Other Reminders:</label>
              <textarea 
                className="mt-2 w-full h-32 border border-[#D4C4B0] rounded-md p-2 text-sm text-[#4A3C28] resize-none focus:border-[#8B7355] focus:outline-none"
                placeholder="Any other important information..."
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-20 h-px bg-[#D4C4B0]"></div>
            <Heart className="w-5 h-5 text-[#E8B4B8]" />
            <div className="w-20 h-px bg-[#D4C4B0]"></div>
          </div>
          <p className="text-[#8B7355] text-sm italic">Remember to review and update this checklist annually</p>
        </div>
      </div>
    </div>
  );
};

export default EstatePlanningChecklist;