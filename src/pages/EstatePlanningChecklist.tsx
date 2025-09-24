import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Heart, FileText, Users, Shield, Home, Phone, Calendar, Archive, Sparkles, Check, ClipboardList, Baby } from 'lucide-react';

interface ChecklistItem {
  id: string;
  number: string;
  task: string;
  hasInput?: boolean;
  inputPlaceholder?: string;
  inputType?: 'text' | 'date' | 'select';
  options?: string[];
}

interface ChecklistSection {
  title: string;
  subtitle?: string;
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
        {section.subtitle && (
          <p className="text-[#4A3C28]/70 text-xs mt-1 italic">{section.subtitle}</p>
        )}
      </div>
      <div className="space-y-4">
        {section.items.map((item, index) => (
          <div key={item.id} className="flex items-start gap-4 pb-3 border-b border-[#F0E6E0]">
            <span className="text-[#8B7355] font-medium w-8">{startNumber + index}.</span>
            <div className="flex-1">
              <p className="text-[#4A3C28] text-sm leading-relaxed">{item.task}</p>
              {item.hasInput && (
                <input
                  type={item.inputType || 'text'}
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
          <div className="flex justify-center gap-8 mb-8">
            <FileText className="w-12 h-12 text-[#E8B4B8]" strokeWidth={1} />
            <Heart className="w-12 h-12 text-[#E8B4B8]" strokeWidth={1} />
            <Shield className="w-12 h-12 text-[#E8B4B8]" strokeWidth={1} />
          </div>
          
          <p className="text-sm text-[#8B7355] font-medium mb-4">Family Lyfe Fix's Estate Planning Checklist</p>
          
          
          <div className="w-40 h-px bg-[#D4C4B0] mb-6"></div>
          
          <h2 className="text-2xl text-[#8B7355] uppercase tracking-[0.3em] mb-12" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            Planning Guide
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-4 text-sm text-[#4A3C28]/80 text-left">
            <p>
              This checklist is designed to help you protect the people you love most. It covers the essential documents and decisions 
              you need to make while you're healthy and able - because planning ahead is one of the greatest gifts you can give your family. 
              Use this alongside your will to create a comprehensive plan that truly covers all aspects of your life.
            </p>
            <p className="italic">
              As you work through this checklist, remember that each item you complete brings peace of mind to both you and your loved ones. 
              Take your time, and check off each item as you finish it.
            </p>
          </div>
          
          <div className="mt-16 flex justify-center gap-8">
            <Users className="w-12 h-12 text-[#E8B4B8]" strokeWidth={1} />
            <Home className="w-12 h-12 text-[#E8B4B8]" strokeWidth={1} />
            <Calendar className="w-12 h-12 text-[#E8B4B8]" strokeWidth={1} />
          </div>
        </div>
      </div>

      {/* Page 2: Essential Legal Documents */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-2 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Essential Legal Documents
        </h2>
        <p className="text-center text-sm text-[#8B7355] mb-8 italic">These are the must-haves. Not suggestions. Requirements.</p>
        
        <ChecklistTable 
          section={{
            title: "Core Documents",
            items: [
              { id: "will", number: "1", task: "Last Will and Testament", hasInput: true, inputPlaceholder: "Date completed" },
              { id: "will-executor", number: "2", task: "Names executor/personal representative", hasInput: true, inputPlaceholder: "Executor name" },
              { id: "will-guardian", number: "3", task: "Names guardians for minor children (if applicable)", hasInput: true, inputPlaceholder: "Guardian name(s)" },
              { id: "poa-financial", number: "4", task: "Durable Power of Attorney for Finances", hasInput: true, inputPlaceholder: "Agent name" },
              { id: "poa-financial-alt", number: "5", task: "Alternate financial POA agent", hasInput: true, inputPlaceholder: "Alternate agent name" },
              { id: "poa-effective", number: "6", task: "POA effective immediately or upon incapacity?", hasInput: true, inputPlaceholder: "Immediately / Upon incapacity" },
            ]
          }}
        />
        
        <div className="mt-8">
          <ChecklistTable 
            section={{
              title: "Healthcare Documents",
              items: [
                { id: "healthcare-poa", number: "7", task: "Healthcare Power of Attorney/Healthcare Proxy", hasInput: true, inputPlaceholder: "Agent name" },
                { id: "healthcare-alt", number: "8", task: "Alternate healthcare agent", hasInput: true, inputPlaceholder: "Alternate agent name" },
                { id: "hipaa", number: "9", task: "HIPAA authorization included?", hasInput: true, inputPlaceholder: "Yes / No" },
                { id: "hipaa-form", number: "10", task: "HIPAA Authorization Form (if not included above)", hasInput: true, inputPlaceholder: "Authorized persons" },
                { id: "living-will", number: "11", task: "Living Will/Medical Directive", hasInput: true, inputPlaceholder: "Date completed" },
                { id: "end-of-life", number: "12", task: "End-of-life preferences documented?", hasInput: true, inputPlaceholder: "Yes / No" },
                { id: "organ", number: "13", task: "Organ donation preferences?", hasInput: true, inputPlaceholder: "Yes / No / Undecided" },
              ]
            }}
            startNumber={7}
          />
        </div>
      </div>

      {/* Page 3: Minor Children & Beneficiaries */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-8 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Family Protection
        </h2>
        
        <ChecklistTable 
          section={{
            title: "If You Have Minor Children",
            items: [
              { id: "guardian-primary", number: "14", task: "Primary guardian nomination in will", hasInput: true, inputPlaceholder: "Primary guardian name" },
              { id: "guardian-alternate", number: "15", task: "Alternate guardian", hasInput: true, inputPlaceholder: "Alternate guardian name" },
              { id: "guardian-discussed", number: "16", task: "Have you discussed this with them?", hasInput: true, inputPlaceholder: "Yes / No" },
              { id: "standby-guardian", number: "17", task: "Standby Guardianship Forms (for temporary incapacity)", hasInput: true, inputPlaceholder: "Date completed" },
              { id: "state-requirements", number: "18", task: "Check your state's requirements and time limits", hasInput: true, inputPlaceholder: "Requirements verified (Yes/No)" },
            ]
          }}
          startNumber={14}
        />
        
        <div className="mt-8">
          <ChecklistTable 
            section={{
              title: "Beneficiary Designations",
              subtitle: "These override your will, so get them right. Seriously.",
              items: [
                { id: "ira1", number: "19", task: "IRA Account #1", hasInput: true, inputPlaceholder: "Institution & Primary beneficiary" },
                { id: "ira1-contingent", number: "20", task: "IRA #1 Contingent beneficiary", hasInput: true, inputPlaceholder: "Contingent beneficiary name" },
                { id: "401k", number: "21", task: "401(k)/403(b)", hasInput: true, inputPlaceholder: "Employer/Institution & Primary beneficiary" },
                { id: "401k-contingent", number: "22", task: "401(k) Contingent beneficiary", hasInput: true, inputPlaceholder: "Contingent beneficiary name" },
                { id: "401k-spouse", number: "23", task: "Spouse consent obtained (if required)?", hasInput: true, inputPlaceholder: "Yes / No / N/A" },
                { id: "life-insurance", number: "24", task: "Life Insurance Policy", hasInput: true, inputPlaceholder: "Company & Policy number" },
                { id: "life-beneficiary", number: "25", task: "Life insurance beneficiaries", hasInput: true, inputPlaceholder: "Primary & Contingent beneficiaries" },
              ]
            }}
            startNumber={19}
          />
        </div>
      </div>

      {/* Page 4: Financial Accounts */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-8 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Financial Accounts
        </h2>
        
        <ChecklistTable 
          section={{
            title: "Bank & Investment Accounts",
            items: [
              { id: "bank-pod", number: "26", task: "Bank Accounts (POD - Payable on Death)", hasInput: true, inputPlaceholder: "Institution & Beneficiary" },
              { id: "investment-tod", number: "27", task: "Investment Accounts (TOD - Transfer on Death)", hasInput: true, inputPlaceholder: "Institution & Beneficiary" },
              { id: "checking", number: "28", task: "Checking Account", hasInput: true, inputPlaceholder: "Bank & Account number" },
              { id: "checking-balance", number: "29", task: "Checking approximate balance", hasInput: true, inputPlaceholder: "Balance" },
              { id: "savings", number: "30", task: "Savings Account", hasInput: true, inputPlaceholder: "Bank & Account number" },
              { id: "savings-balance", number: "31", task: "Savings approximate balance", hasInput: true, inputPlaceholder: "Balance" },
              { id: "brokerage", number: "32", task: "Investment/Brokerage Account", hasInput: true, inputPlaceholder: "Institution & Account number" },
              { id: "brokerage-value", number: "33", task: "Investment approximate value", hasInput: true, inputPlaceholder: "Value" },
            ]
          }}
          startNumber={26}
        />
        
        <div className="mt-8">
          <ChecklistTable 
            section={{
              title: "Asset Inventory",
              subtitle: "Know what you have. Revolutionary concept, I know.",
              items: [
                { id: "primary-residence", number: "34", task: "Primary Residence Address", hasInput: true, inputPlaceholder: "Address" },
                { id: "ownership", number: "35", task: "Owned individually or jointly?", hasInput: true, inputPlaceholder: "Individual / Joint" },
                { id: "mortgage", number: "36", task: "Mortgage balance", hasInput: true, inputPlaceholder: "Balance" },
                { id: "title-location", number: "37", task: "Title/deed location", hasInput: true, inputPlaceholder: "Location" },
                { id: "other-real-estate", number: "38", task: "Other Real Estate", hasInput: true, inputPlaceholder: "Address & Type" },
              ]
            }}
            startNumber={34}
          />
        </div>
      </div>

      {/* Page 5: Personal Property & Digital Assets */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-8 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Personal & Digital Assets
        </h2>
        
        <ChecklistTable 
          section={{
            title: "Personal Property (High Value Items)",
            items: [
              { id: "jewelry", number: "39", task: "Jewelry", hasInput: true, inputPlaceholder: "Description & Appraised value" },
              { id: "art", number: "40", task: "Art/Collectibles", hasInput: true, inputPlaceholder: "Description & Location" },
              { id: "art-value", number: "41", task: "Art/Collectibles appraised value", hasInput: true, inputPlaceholder: "Value" },
              { id: "business", number: "42", task: "Business/Partnership", hasInput: true, inputPlaceholder: "Business name" },
              { id: "business-ownership", number: "43", task: "Ownership percentage", hasInput: true, inputPlaceholder: "Percentage" },
              { id: "succession-plan", number: "44", task: "Succession plan in place?", hasInput: true, inputPlaceholder: "Yes / No" },
            ]
          }}
          startNumber={39}
        />
        
        <div className="mt-8">
          <ChecklistTable 
            section={{
              title: "Digital Assets",
              items: [
                { id: "password-manager", number: "45", task: "Password manager in use?", hasInput: true, inputPlaceholder: "Yes / No - Service name" },
                { id: "digital-executor", number: "46", task: "Digital executor named?", hasInput: true, inputPlaceholder: "Yes / No - Name" },
                { id: "social-media", number: "47", task: "Social media account preferences documented?", hasInput: true, inputPlaceholder: "Yes / No" },
                { id: "online-accounts", number: "48", task: "Online Account Inventory completed", hasInput: true, inputPlaceholder: "Date completed" },
              ]
            }}
            startNumber={45}
          />
        </div>
      </div>

      {/* Page 6: Key People & Contacts */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-2 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Key People & Contact Info
        </h2>
        <p className="text-center text-sm text-[#8B7355] mb-8 italic">The humans you're trusting with important stuff</p>
        
        <ChecklistTable 
          section={{
            title: "Legal & Financial Team",
            items: [
              { id: "attorney", number: "49", task: "Estate Planning Attorney", hasInput: true, inputPlaceholder: "Name & Phone" },
              { id: "financial-advisor", number: "50", task: "Financial Advisor", hasInput: true, inputPlaceholder: "Name, Company & Phone" },
              { id: "accountant", number: "51", task: "Accountant/CPA", hasInput: true, inputPlaceholder: "Name, Company & Phone" },
            ]
          }}
          startNumber={49}
        />
        
        <div className="mt-8">
          <ChecklistTable 
            section={{
              title: "Document Storage Locations",
              items: [
                { id: "safe-deposit", number: "52", task: "Safe deposit box location", hasInput: true, inputPlaceholder: "Bank & Box number" },
                { id: "home-safe", number: "53", task: "Home safe/file cabinet", hasInput: true, inputPlaceholder: "Location in home" },
                { id: "attorney-copies", number: "54", task: "Attorney's office", hasInput: true, inputPlaceholder: "Attorney name & address" },
                { id: "other-storage", number: "55", task: "Other storage location", hasInput: true, inputPlaceholder: "Location details" },
              ]
            }}
            startNumber={52}
          />
        </div>
        
        <div className="mt-8">
          <ChecklistTable 
            section={{
              title: "Copies Provided To",
              items: [
                { id: "spouse-copies", number: "56", task: "Spouse/partner", hasInput: true, inputPlaceholder: "Date provided" },
                { id: "children-copies", number: "57", task: "Adult children", hasInput: true, inputPlaceholder: "Names & dates" },
                { id: "attorney-copies-given", number: "58", task: "Attorney", hasInput: true, inputPlaceholder: "Date provided" },
                { id: "trusted-person", number: "59", task: "Other trusted person", hasInput: true, inputPlaceholder: "Name & date" },
              ]
            }}
            startNumber={56}
          />
        </div>
      </div>

      {/* Page 7: Review & Update Schedule */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-2 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Review & Update Schedule
        </h2>
        <p className="text-center text-sm text-[#8B7355] mb-8 italic">Because life changes, and your documents should too</p>
        
        <ChecklistTable 
          section={{
            title: "Annual Review Items",
            items: [
              { id: "beneficiary-review", number: "60", task: "Beneficiary Designations Review", hasInput: true, inputPlaceholder: "Date of last review" },
              { id: "changes-needed", number: "61", task: "Changes needed?", hasInput: true, inputPlaceholder: "Yes / No - Details" },
              { id: "next-review", number: "62", task: "Next review date", hasInput: true, inputPlaceholder: "Date" },
              { id: "agents-willing", number: "63", task: "All agents/executors still willing and able?", hasInput: true, inputPlaceholder: "Yes / No" },
              { id: "contact-current", number: "64", task: "Contact info current?", hasInput: true, inputPlaceholder: "Yes / No" },
            ]
          }}
          startNumber={60}
        />
        
        <div className="mt-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="bg-[#E8B4B8] -mx-6 -mt-6 px-6 py-3 mb-6 rounded-t-lg">
              <h3 className="text-[#4A3C28] font-semibold uppercase tracking-wider text-sm">Major Life Event Triggers</h3>
              <p className="text-[#4A3C28]/70 text-xs mt-1 italic">Update documents within 60 days of any of these events:</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Marriage", "Divorce", "Birth/adoption of child", "Death of beneficiary or agent",
                "Significant change in financial situation", "Move to different state", "Retirement", "Diagnosis of serious illness"
              ].map((event, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#E8B4B8]" />
                  <span className="text-sm text-[#4A3C28]">{event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Page 8: State Requirements & Next Steps */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-2 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          State-Specific Requirements
        </h2>
        <p className="text-center text-sm text-[#8B7355] mb-8 italic">Because apparently every state has to be different</p>
        
        <ChecklistTable 
          section={{
            title: "Your State Requirements",
            items: [
              { id: "state", number: "65", task: "Your State", hasInput: true, inputPlaceholder: "State name" },
              { id: "witnesses", number: "66", task: "Number of witnesses needed", hasInput: true, inputPlaceholder: "Number" },
              { id: "witness-quals", number: "67", task: "Specific witness qualifications required?", hasInput: true, inputPlaceholder: "Yes / No - Details" },
              { id: "notarization", number: "68", task: "Which documents require notarization", hasInput: true, inputPlaceholder: "List documents" },
              { id: "age-requirements", number: "69", task: "Minimum age for agents/proxies", hasInput: true, inputPlaceholder: "Age" },
              { id: "special-requirements", number: "70", task: "Any special state requirements", hasInput: true, inputPlaceholder: "Details" },
              { id: "state-forms", number: "71", task: "Using state-approved forms?", hasInput: true, inputPlaceholder: "Yes / No - Source" },
            ]
          }}
          startNumber={65}
        />
        
        <div className="mt-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="bg-[#E8B4B8] -mx-6 -mt-6 px-6 py-3 mb-6 rounded-t-lg">
              <h3 className="text-[#4A3C28] font-semibold uppercase tracking-wider text-sm">If You Move to a New State</h3>
            </div>
            <div className="space-y-3">
              {[
                "Research new state's requirements",
                "Update documents if needed",
                "Re-execute documents if required",
                "Update professional team (attorney, etc.)"
              ].map((task, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-[#8B7355] font-medium">{index + 1}.</span>
                  <span className="text-sm text-[#4A3C28]">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Page 9: Next Steps */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-2 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Next Steps
        </h2>
        <p className="text-center text-sm text-[#8B7355] mb-8 italic">What to do after completing this checklist</p>
        
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="bg-[#E8B4B8] -mx-6 -mt-6 px-6 py-3 mb-6 rounded-t-lg">
            <h3 className="text-[#4A3C28] font-semibold uppercase tracking-wider text-sm">Immediate Actions</h3>
          </div>
          <div className="space-y-3">
            {[
              "Schedule appointments for missing documents",
              "Gather required information for attorney meetings",
              "Update any outdated beneficiary designations",
              "Inform key people of their roles and responsibilities"
            ].map((action, index) => (
              <div key={index} className="flex items-start gap-3">
                <ClipboardList className="w-4 h-4 text-[#E8B4B8] mt-0.5" />
                <span className="text-sm text-[#4A3C28]">{action}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="bg-[#E8B4B8] -mx-6 -mt-6 px-6 py-3 mb-6 rounded-t-lg">
            <h3 className="text-[#4A3C28] font-semibold uppercase tracking-wider text-sm">Ongoing Responsibilities</h3>
          </div>
          <div className="space-y-3">
            {[
              "Set calendar reminders for annual reviews",
              "Keep document storage locations secure but accessible",
              "Communicate your wishes to family members",
              "Consider whether a trust is needed for your situation"
            ].map((task, index) => (
              <div key={index} className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-[#E8B4B8] mt-0.5" />
                <span className="text-sm text-[#4A3C28]">{task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page 10: Final Thoughts */}
      <div className="pdf-page p-8">
        <h2 className="text-3xl text-[#4A3C28] mb-8 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Final Thoughts from Baby Lyfe
        </h2>
        
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="space-y-6 text-[#4A3C28]">
            <p className="text-sm leading-relaxed">
              This checklist might feel overwhelming at first glance. But here's the truth: taking the time to complete 
              these documents now is one of the most loving things you can do for your family. It's not about preparing 
              for the worst - it's about ensuring your loved ones are protected and your wishes are honored, no matter 
              what life brings.
            </p>
            
            <p className="text-sm leading-relaxed">
              Every family deserves the security that comes from proper planning. When you take care of these details 
              ahead of time, you're giving your family the gift of clarity during what could be the most difficult 
              moments of their lives.
            </p>
            
            <p className="text-sm leading-relaxed">
              You don't have to do this alone. Estate planning can feel complex, but with the right guidance and 
              resources, it becomes much more manageable.
            </p>
            
            <p className="text-sm font-semibold">
              Your family's future matters. Take the first step today.
            </p>
            
            <div className="pt-6 border-t border-[#F0E6E0]">
              <p className="text-sm text-[#8B7355]">
                Need help getting started? Visit [YourWebsite.com] for more resources, or consult with an estate 
                planning attorney in your state who can guide you through the process with care and expertise.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center space-y-3">
          <div className="flex justify-center gap-3 items-center">
            <Baby className="w-6 h-6 text-[#E8B4B8]" />
            <p className="text-sm font-medium text-[#8B7355]">
              Baby Lyfe's Motto: "Planning ahead isn't just for naptime."
            </p>
            <Baby className="w-6 h-6 text-[#E8B4B8]" />
          </div>
          
          <div className="text-xs text-[#8B7355]/60 max-w-2xl mx-auto">
            <p>© 2025 Family Lyfe Fix. This checklist is for informational purposes only and is not legal advice.</p>
            <p>Consult with a qualified estate planning attorney in your state for personalized guidance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstatePlanningChecklist;