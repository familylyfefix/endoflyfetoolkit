import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Download, Heart, FileText, Users, Shield, Home, Phone, Calendar, Archive, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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

  return (
    <div className="min-h-screen bg-[#f8f3f0] print:bg-[#f8f3f0]">
      {/* Print Styles */}
      <style>{`
        @media print {
          body { background: #f8f3f0 !important; }
          .no-print { display: none !important; }
          .pdf-page { page-break-after: always; }
          .pdf-page:last-child { page-break-after: auto; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          input { border: 1px solid #e0d4cc !important; background: white !important; }
          .checkbox-print { 
            width: 16px !important; 
            height: 16px !important; 
            border: 2px solid #8b7968 !important;
            background: white !important;
          }
          .checkbox-print[data-checked="true"]::after {
            content: "✓";
            display: block;
            text-align: center;
            color: #8b7968;
            font-weight: bold;
          }
        }
      `}</style>

      {/* Download Button - Hidden in Print */}
      <div className="no-print fixed top-4 right-4 z-50">
        <Button onClick={handlePrint} className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Page 1: Cover */}
      <div className="pdf-page min-h-screen p-16 flex flex-col items-center justify-center">
        <div className="text-center space-y-8 max-w-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="h-16 w-16 text-primary" />
            </div>
          </div>
          
          <h3 className="text-2xl font-medium text-primary">Baby Lyfe's</h3>
          <h1 className="text-5xl font-bold text-[#2c1810]">Estate Planning Checklist</h1>
          <div className="pt-8">
            <h2 className="text-3xl font-semibold text-[#8b7968] italic">
              The "I'm Not Dead Yet" Planning Guide
            </h2>
          </div>
          
          <div className="pt-12 text-lg text-[#5a4a3f] leading-relaxed">
            <p>
              This checklist is designed to help you protect the people you love most. 
              It covers the essential documents and decisions you need to make while you're 
              healthy and able - because planning ahead is one of the greatest gifts you 
              can give your family.
            </p>
          </div>

          <div className="pt-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 rounded-full">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-[#5a4a3f]">Created: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page 2: Essential Legal Documents */}
      <div className="pdf-page min-h-screen p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#2c1810]">Essential Legal Documents</h2>
              <p className="text-[#8b7968] italic">These are the must-haves. Not suggestions. Requirements.</p>
            </div>
          </div>

          <div className="bg-white/60 rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-semibold text-[#2c1810] flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Core Documents
            </h3>

            {/* Last Will and Testament */}
            <div className="space-y-4 pl-7">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="will"
                    checked={checkedItems['will'] || false}
                    onCheckedChange={() => handleCheck('will')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['will'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="will" className="text-[#2c1810] font-medium cursor-pointer">
                    Last Will and Testament
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-2 ml-4">
                    <p>• Names executor/personal representative</p>
                    <p>• Distributes assets not covered by other documents</p>
                    <p>• Names guardians for minor children (if applicable)</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span>Date completed:</span>
                      <Input 
                        type="date" 
                        className="w-40 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['will-date'] || ''}
                        onChange={(e) => handleInput('will-date', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-[#e0d4cc]" />

            {/* Durable Power of Attorney */}
            <div className="space-y-4 pl-7">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="poa"
                    checked={checkedItems['poa'] || false}
                    onCheckedChange={() => handleCheck('poa')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['poa'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="poa" className="text-[#2c1810] font-medium cursor-pointer">
                    Durable Power of Attorney for Finances
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-3 ml-4">
                    <div className="flex items-center gap-2">
                      <span>Agent name:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['poa-agent'] || ''}
                        onChange={(e) => handleInput('poa-agent', e.target.value)}
                        placeholder="Enter agent's full name"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Alternate agent:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['poa-alternate'] || ''}
                        onChange={(e) => handleInput('poa-alternate', e.target.value)}
                        placeholder="Enter alternate agent's name"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Date completed:</span>
                      <Input 
                        type="date" 
                        className="w-40 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['poa-date'] || ''}
                        onChange={(e) => handleInput('poa-date', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 3: Healthcare Documents */}
      <div className="pdf-page min-h-screen p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-[#2c1810]">Healthcare Directives</h2>
          </div>

          <div className="bg-white/60 rounded-2xl p-8 space-y-6">
            {/* Healthcare Power of Attorney */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="healthcare-poa"
                    checked={checkedItems['healthcare-poa'] || false}
                    onCheckedChange={() => handleCheck('healthcare-poa')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['healthcare-poa'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="healthcare-poa" className="text-[#2c1810] font-medium cursor-pointer">
                    Healthcare Power of Attorney/Healthcare Proxy
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-3 ml-4">
                    <div className="flex items-center gap-2">
                      <span>Agent name:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['healthcare-agent'] || ''}
                        onChange={(e) => handleInput('healthcare-agent', e.target.value)}
                        placeholder="Enter healthcare agent's name"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Alternate agent:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['healthcare-alternate'] || ''}
                        onChange={(e) => handleInput('healthcare-alternate', e.target.value)}
                        placeholder="Enter alternate agent's name"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <span>HIPAA authorization included?</span>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="hipaa" 
                            value="yes"
                            className="text-primary"
                            onChange={(e) => handleInput('hipaa', e.target.value)}
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="hipaa" 
                            value="no"
                            className="text-primary"
                            onChange={(e) => handleInput('hipaa', e.target.value)}
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Date completed:</span>
                      <Input 
                        type="date" 
                        className="w-40 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['healthcare-date'] || ''}
                        onChange={(e) => handleInput('healthcare-date', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-[#e0d4cc]" />

            {/* Living Will */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="living-will"
                    checked={checkedItems['living-will'] || false}
                    onCheckedChange={() => handleCheck('living-will')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['living-will'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="living-will" className="text-[#2c1810] font-medium cursor-pointer">
                    Living Will/Medical Directive
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-3 ml-4">
                    <div className="flex items-center gap-4">
                      <span>End-of-life preferences documented?</span>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="eol-prefs" 
                            value="yes"
                            onChange={(e) => handleInput('eol-prefs', e.target.value)}
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="eol-prefs" 
                            value="no"
                            onChange={(e) => handleInput('eol-prefs', e.target.value)}
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Organ donation preferences?</span>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="organ" 
                            value="yes"
                            onChange={(e) => handleInput('organ', e.target.value)}
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="organ" 
                            value="no"
                            onChange={(e) => handleInput('organ', e.target.value)}
                          />
                          <span>No</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="organ" 
                            value="undecided"
                            onChange={(e) => handleInput('organ', e.target.value)}
                          />
                          <span>Undecided</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Date completed:</span>
                      <Input 
                        type="date" 
                        className="w-40 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['living-will-date'] || ''}
                        onChange={(e) => handleInput('living-will-date', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 4: Minor Children */}
      <div className="pdf-page min-h-screen p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-[#2c1810]">If You Have Minor Children</h2>
          </div>

          <div className="bg-white/60 rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-semibold text-[#2c1810]">Guardianship Nominations</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="guardianship"
                    checked={checkedItems['guardianship'] || false}
                    onCheckedChange={() => handleCheck('guardianship')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['guardianship'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="guardianship" className="text-[#2c1810] font-medium cursor-pointer">
                    Guardianship Nominations in Will
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-3 ml-4">
                    <div className="flex items-center gap-2">
                      <span>Primary guardian:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['primary-guardian'] || ''}
                        onChange={(e) => handleInput('primary-guardian', e.target.value)}
                        placeholder="Enter primary guardian's name"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Alternate guardian:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['alternate-guardian'] || ''}
                        onChange={(e) => handleInput('alternate-guardian', e.target.value)}
                        placeholder="Enter alternate guardian's name"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Have you discussed this with them?</span>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="guardian-discussed" 
                            value="yes"
                            onChange={(e) => handleInput('guardian-discussed', e.target.value)}
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="guardian-discussed" 
                            value="no"
                            onChange={(e) => handleInput('guardian-discussed', e.target.value)}
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-[#e0d4cc]" />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="standby"
                    checked={checkedItems['standby'] || false}
                    onCheckedChange={() => handleCheck('standby')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['standby'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="standby" className="text-[#2c1810] font-medium cursor-pointer">
                    Standby Guardianship Forms (if needed)
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-2 ml-4">
                    <p>• For temporary incapacity situations</p>
                    <p>• Check your state's requirements and time limits</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span>Date completed:</span>
                      <Input 
                        type="date" 
                        className="w-40 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['standby-date'] || ''}
                        onChange={(e) => handleInput('standby-date', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 5: Beneficiary Designations */}
      <div className="pdf-page min-h-screen p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#2c1810]">Beneficiary Designations</h2>
              <p className="text-[#8b7968] italic">These override your will, so get them right. Seriously.</p>
            </div>
          </div>

          <div className="bg-white/60 rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-semibold text-[#2c1810]">Retirement Accounts</h3>
            
            {/* IRA Account #1 */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="ira1"
                    checked={checkedItems['ira1'] || false}
                    onCheckedChange={() => handleCheck('ira1')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['ira1'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="ira1" className="text-[#2c1810] font-medium cursor-pointer">
                    IRA Account #1
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-3 ml-4">
                    <div className="flex items-center gap-2">
                      <span>Institution:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['ira1-institution'] || ''}
                        onChange={(e) => handleInput('ira1-institution', e.target.value)}
                        placeholder="Enter institution name"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Primary beneficiary:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['ira1-primary'] || ''}
                        onChange={(e) => handleInput('ira1-primary', e.target.value)}
                        placeholder="Enter primary beneficiary"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Contingent beneficiary:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['ira1-contingent'] || ''}
                        onChange={(e) => handleInput('ira1-contingent', e.target.value)}
                        placeholder="Enter contingent beneficiary"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Last updated:</span>
                      <Input 
                        type="date" 
                        className="w-40 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['ira1-date'] || ''}
                        onChange={(e) => handleInput('ira1-date', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-[#e0d4cc]" />

            {/* 401k */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="401k"
                    checked={checkedItems['401k'] || false}
                    onCheckedChange={() => handleCheck('401k')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['401k'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="401k" className="text-[#2c1810] font-medium cursor-pointer">
                    401(k)/403(b)
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-3 ml-4">
                    <div className="flex items-center gap-2">
                      <span>Employer/Institution:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['401k-employer'] || ''}
                        onChange={(e) => handleInput('401k-employer', e.target.value)}
                        placeholder="Enter employer/institution"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Primary beneficiary:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['401k-primary'] || ''}
                        onChange={(e) => handleInput('401k-primary', e.target.value)}
                        placeholder="Enter primary beneficiary"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Contingent beneficiary:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['401k-contingent'] || ''}
                        onChange={(e) => handleInput('401k-contingent', e.target.value)}
                        placeholder="Enter contingent beneficiary"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Spouse consent obtained (if required)?</span>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="spouse-consent" 
                            value="yes"
                            onChange={(e) => handleInput('spouse-consent', e.target.value)}
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="spouse-consent" 
                            value="no"
                            onChange={(e) => handleInput('spouse-consent', e.target.value)}
                          />
                          <span>No</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="spouse-consent" 
                            value="na"
                            onChange={(e) => handleInput('spouse-consent', e.target.value)}
                          />
                          <span>N/A</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 6: Asset Inventory */}
      <div className="pdf-page min-h-screen p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-[#2c1810]">Asset Inventory</h2>
          </div>

          <div className="bg-white/60 rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-semibold text-[#2c1810]">Real Estate</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="property1"
                    checked={checkedItems['property1'] || false}
                    onCheckedChange={() => handleCheck('property1')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['property1'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="property1" className="text-[#2c1810] font-medium cursor-pointer">
                    Property #1
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-3 ml-4">
                    <div className="flex items-center gap-2">
                      <span>Address:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['property1-address'] || ''}
                        onChange={(e) => handleInput('property1-address', e.target.value)}
                        placeholder="Enter property address"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Deed location:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['property1-deed'] || ''}
                        onChange={(e) => handleInput('property1-deed', e.target.value)}
                        placeholder="Where is the deed stored?"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Mortgage info:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['property1-mortgage'] || ''}
                        onChange={(e) => handleInput('property1-mortgage', e.target.value)}
                        placeholder="Lender and account number"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-[#e0d4cc]" />

            <h3 className="text-xl font-semibold text-[#2c1810]">Financial Accounts</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="checking"
                    checked={checkedItems['checking'] || false}
                    onCheckedChange={() => handleCheck('checking')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['checking'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="checking" className="text-[#2c1810] font-medium cursor-pointer">
                    Checking Account
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-3 ml-4">
                    <div className="flex items-center gap-2">
                      <span>Bank:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['checking-bank'] || ''}
                        onChange={(e) => handleInput('checking-bank', e.target.value)}
                        placeholder="Enter bank name"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Account type:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['checking-type'] || ''}
                        onChange={(e) => handleInput('checking-type', e.target.value)}
                        placeholder="Joint, individual, etc."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="savings"
                    checked={checkedItems['savings'] || false}
                    onCheckedChange={() => handleCheck('savings')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['savings'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="savings" className="text-[#2c1810] font-medium cursor-pointer">
                    Savings Account
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-3 ml-4">
                    <div className="flex items-center gap-2">
                      <span>Bank:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['savings-bank'] || ''}
                        onChange={(e) => handleInput('savings-bank', e.target.value)}
                        placeholder="Enter bank name"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Account type:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['savings-type'] || ''}
                        onChange={(e) => handleInput('savings-type', e.target.value)}
                        placeholder="Joint, individual, etc."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 7: Key People & Contacts */}
      <div className="pdf-page min-h-screen p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-[#2c1810]">Key People & Contacts</h2>
          </div>

          <div className="bg-white/60 rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-semibold text-[#2c1810]">Your Legal Team</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="attorney"
                    checked={checkedItems['attorney'] || false}
                    onCheckedChange={() => handleCheck('attorney')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['attorney'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="attorney" className="text-[#2c1810] font-medium cursor-pointer">
                    Estate Planning Attorney
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-3 ml-4">
                    <div className="flex items-center gap-2">
                      <span>Name:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['attorney-name'] || ''}
                        onChange={(e) => handleInput('attorney-name', e.target.value)}
                        placeholder="Attorney's name"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Phone:</span>
                      <Input 
                        type="tel" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['attorney-phone'] || ''}
                        onChange={(e) => handleInput('attorney-phone', e.target.value)}
                        placeholder="Phone number"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Email:</span>
                      <Input 
                        type="email" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['attorney-email'] || ''}
                        onChange={(e) => handleInput('attorney-email', e.target.value)}
                        placeholder="Email address"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="accountant"
                    checked={checkedItems['accountant'] || false}
                    onCheckedChange={() => handleCheck('accountant')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['accountant'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="accountant" className="text-[#2c1810] font-medium cursor-pointer">
                    Accountant/Tax Preparer
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-3 ml-4">
                    <div className="flex items-center gap-2">
                      <span>Name:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['accountant-name'] || ''}
                        onChange={(e) => handleInput('accountant-name', e.target.value)}
                        placeholder="Accountant's name"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Phone:</span>
                      <Input 
                        type="tel" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['accountant-phone'] || ''}
                        onChange={(e) => handleInput('accountant-phone', e.target.value)}
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="advisor"
                    checked={checkedItems['advisor'] || false}
                    onCheckedChange={() => handleCheck('advisor')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['advisor'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="advisor" className="text-[#2c1810] font-medium cursor-pointer">
                    Financial Advisor
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-3 ml-4">
                    <div className="flex items-center gap-2">
                      <span>Name:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['advisor-name'] || ''}
                        onChange={(e) => handleInput('advisor-name', e.target.value)}
                        placeholder="Advisor's name"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Company:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['advisor-company'] || ''}
                        onChange={(e) => handleInput('advisor-company', e.target.value)}
                        placeholder="Company name"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Phone:</span>
                      <Input 
                        type="tel" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['advisor-phone'] || ''}
                        onChange={(e) => handleInput('advisor-phone', e.target.value)}
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 8: Document Storage */}
      <div className="pdf-page min-h-screen p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Archive className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-[#2c1810]">Document Storage & Access</h2>
          </div>

          <div className="bg-white/60 rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-semibold text-[#2c1810]">Physical Document Locations</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="originals"
                    checked={checkedItems['originals'] || false}
                    onCheckedChange={() => handleCheck('originals')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['originals'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="originals" className="text-[#2c1810] font-medium cursor-pointer">
                    Original Documents
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-3 ml-4">
                    <div className="flex items-center gap-2">
                      <span>Location:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['originals-location'] || ''}
                        onChange={(e) => handleInput('originals-location', e.target.value)}
                        placeholder="Safe deposit box, home safe, etc."
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Access info:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['originals-access'] || ''}
                        onChange={(e) => handleInput('originals-access', e.target.value)}
                        placeholder="Key location, combination, etc."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="copies"
                    checked={checkedItems['copies'] || false}
                    onCheckedChange={() => handleCheck('copies')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['copies'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="copies" className="text-[#2c1810] font-medium cursor-pointer">
                    Copy Location
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-3 ml-4">
                    <div className="flex items-center gap-2">
                      <span>Where stored:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['copies-location'] || ''}
                        onChange={(e) => handleInput('copies-location', e.target.value)}
                        placeholder="Home filing cabinet, cloud storage, etc."
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Who has copies:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['copies-who'] || ''}
                        onChange={(e) => handleInput('copies-who', e.target.value)}
                        placeholder="Attorney, executor, etc."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-[#e0d4cc]" />

            <h3 className="text-xl font-semibold text-[#2c1810]">Digital Storage</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="print:hidden">
                  <Checkbox 
                    id="digital"
                    checked={checkedItems['digital'] || false}
                    onCheckedChange={() => handleCheck('digital')}
                    className="mt-1"
                  />
                </div>
                <div className="checkbox-print hidden print:block mt-1" data-checked={checkedItems['digital'] || false}></div>
                <div className="flex-1 space-y-3">
                  <label htmlFor="digital" className="text-[#2c1810] font-medium cursor-pointer">
                    Digital Copies
                  </label>
                  <div className="text-sm text-[#5a4a3f] space-y-3 ml-4">
                    <div className="flex items-center gap-2">
                      <span>Cloud service:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['digital-service'] || ''}
                        onChange={(e) => handleInput('digital-service', e.target.value)}
                        placeholder="Google Drive, Dropbox, etc."
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Folder name:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['digital-folder'] || ''}
                        onChange={(e) => handleInput('digital-folder', e.target.value)}
                        placeholder="Estate planning documents"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Access granted to:</span>
                      <Input 
                        type="text" 
                        className="flex-1 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                        value={formData['digital-access'] || ''}
                        onChange={(e) => handleInput('digital-access', e.target.value)}
                        placeholder="List of people with access"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 9: State Requirements & Next Steps */}
      <div className="pdf-page min-h-screen p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-[#2c1810]">State Requirements & Next Steps</h2>
          </div>

          <div className="bg-white/60 rounded-2xl p-8 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#2c1810]">Your State's Specific Requirements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#5a4a3f]">Your state:</span>
                  <Input 
                    type="text" 
                    className="w-64 h-8 text-sm bg-white/80 border-[#e0d4cc]"
                    value={formData['state'] || ''}
                    onChange={(e) => handleInput('state', e.target.value)}
                    placeholder="Enter your state"
                  />
                </div>
                <div className="text-sm text-[#5a4a3f] space-y-2 ml-4">
                  <p className="font-medium">Research these state-specific items:</p>
                  <ul className="space-y-2">
                    <li>• Will witness requirements (usually 2 disinterested witnesses)</li>
                    <li>• Notarization requirements for documents</li>
                    <li>• Spousal consent laws for beneficiary changes</li>
                    <li>• Community property rules (if applicable)</li>
                    <li>• State estate tax thresholds</li>
                    <li>• Probate procedures and exemptions</li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator className="bg-[#e0d4cc]" />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#2c1810]">Annual Review Checklist</h3>
              <div className="text-sm text-[#5a4a3f] space-y-3">
                <p className="font-medium">Review and update annually or after major life events:</p>
                <div className="grid grid-cols-2 gap-4 ml-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Marriage or divorce</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Birth or adoption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Death of beneficiary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Major asset purchase/sale</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Job change</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Move to new state</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Change in health status</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Tax law changes</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                  <p className="font-medium text-[#2c1810]">Last review date:</p>
                  <Input 
                    type="date" 
                    className="w-40 h-8 text-sm bg-white/80 border-[#e0d4cc] mt-2"
                    value={formData['review-date'] || ''}
                    onChange={(e) => handleInput('review-date', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-[#e0d4cc]" />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#2c1810]">Important Notes</h3>
              <div className="bg-white/50 rounded-lg p-4">
                <textarea 
                  className="w-full h-32 p-3 text-sm bg-transparent border border-[#e0d4cc] rounded resize-none"
                  placeholder="Use this space for any additional notes, special instructions, or reminders..."
                  value={formData['notes'] || ''}
                  onChange={(e) => handleInput('notes', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 10: Final Message */}
      <div className="pdf-page min-h-screen p-16 flex flex-col items-center justify-center">
        <div className="text-center space-y-8 max-w-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="h-16 w-16 text-primary" />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-[#2c1810]">You Did It! 🎉</h2>

          <div className="space-y-6 text-lg text-[#5a4a3f] leading-relaxed">
            <p>
              Congratulations on completing your estate planning checklist! 
              This is a huge step in protecting your family's future.
            </p>

            <p className="font-medium text-[#2c1810]">
              Remember: Estate planning isn't a one-and-done task. 
              Life changes, and your plan should too.
            </p>

            <div className="bg-primary/5 rounded-2xl p-8 space-y-4">
              <h3 className="text-xl font-semibold text-[#2c1810]">Your Next Steps:</h3>
              <ol className="text-left space-y-3 max-w-md mx-auto">
                <li>1. Schedule appointments with professionals if needed</li>
                <li>2. Gather all necessary documents</li>
                <li>3. Have important conversations with loved ones</li>
                <li>4. Store documents safely and inform key people</li>
                <li>5. Set a calendar reminder for annual review</li>
              </ol>
            </div>

            <div className="pt-8 border-t border-[#e0d4cc]">
              <p className="italic text-primary">
                "The best time to plant a tree was 20 years ago. 
                The second best time is now."
              </p>
              <p className="text-sm mt-2">
                You're planting seeds of security for your family's future.
              </p>
            </div>

            <div className="pt-8">
              <p className="text-2xl font-bold text-[#2c1810]">With love,</p>
              <p className="text-xl text-primary mt-2">Baby Lyfe</p>
              <p className="text-sm text-[#8b7968] mt-4">
                Making life's hardest conversations a little easier
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstatePlanningChecklist;