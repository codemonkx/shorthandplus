import React, { useState } from 'react';
import { 
  Search, 
  Headphones, 
  Play, 
  Clock, 
  FileText, 
  Users, 
  Keyboard, 
  LayoutGrid, 
  List, 
  ArrowRight, 
  X,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { STENO_TESTS, TYPING_TESTS } from '../data/mockData';
import CustomSelect from '../components/CustomSelect';

export default function StenoTestsPage({ onStartTest, onStartTypingTest }) {
  const [activeTab, setActiveTab] = useState('steno'); // 'steno' | 'typing'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSpeed, setSelectedSpeed] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  // Typing filter
  const [selectedTypingLang, setSelectedTypingLang] = useState('All');

  const categories = [
    'All',
    'SSC Steno Grade C & D',
    'Patna High Court',
    'Jharkhand High Court',
    'Allahabad High Court',
    'Parliament Reporter'
  ];

  const speeds = ['All', '80 WPM', '100 WPM', '120 WPM'];
  const languages = ['All', 'English', 'Hindi (Kruti Dev)'];
  const typingLangs = ['All', 'English', 'Hindi (Kruti Dev)', 'Hindi (Mangal)'];

  const filteredTests = STENO_TESTS.filter((test) => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.passageText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
    const matchesSpeed = selectedSpeed === 'All' || test.speed === selectedSpeed;
    const matchesLanguage = selectedLanguage === 'All' || test.language.includes(selectedLanguage);
    return matchesSearch && matchesCategory && matchesSpeed && matchesLanguage;
  });

  const filteredTyping = TYPING_TESTS.filter((t) => {
    const matchesLang = selectedTypingLang === 'All' || t.language.includes(selectedTypingLang);
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLang && matchesSearch;
  });

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedSpeed !== 'All' || selectedLanguage !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSpeed('All');
    setSelectedLanguage('All');
  };

  return (
    <div className="calm-vault-page">
      {/* 1. SIMPLE & CALM HEADER TABS */}
      <div className="calm-vault-header">
        <div className="calm-tabs-row">
          <button 
            type="button"
            className={`calm-tab-btn ${activeTab === 'steno' ? 'active' : ''}`}
            onClick={() => setActiveTab('steno')}
          >
            <Headphones size={15} />
            <span>Audio Dictations</span>
            <span className="calm-tab-count font-mono">{STENO_TESTS.length}</span>
          </button>
          <button 
            type="button"
            className={`calm-tab-btn ${activeTab === 'typing' ? 'active' : ''}`}
            onClick={() => setActiveTab('typing')}
          >
            <Keyboard size={15} />
            <span>Typing Speed Drills</span>
            <span className="calm-tab-count font-mono">{TYPING_TESTS.length}</span>
          </button>
        </div>

        <div className="calm-header-status-note">
          <span>Showing <strong>{activeTab === 'steno' ? filteredTests.length : filteredTyping.length}</strong> {activeTab === 'steno' ? 'dictations' : 'drills'}</span>
        </div>
      </div>

      {/* 2. CALM & CLEAN FILTER BAR */}
      {activeTab === 'steno' ? (
        <>
          <div className="calm-filter-bar">
            {/* Search Input */}
            <div className="calm-search-box">
              <Search size={15} className="calm-search-icon" />
              <input
                type="text"
                placeholder="Search dictations by topic, court, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  type="button"
                  className="calm-search-clear"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Filter Dropdowns / Pills */}
            <div className="calm-filter-controls">
              {/* Category Dropdown */}
              <CustomSelect
                className="filter-custom-select"
                value={selectedCategory}
                onChange={(val) => setSelectedCategory(val)}
                options={categories.map((c) => ({ value: c, label: c === 'All' ? 'All Exams' : c }))}
              />

              {/* Speed Dropdown */}
              <CustomSelect
                className="filter-custom-select"
                value={selectedSpeed}
                onChange={(val) => setSelectedSpeed(val)}
                options={speeds.map((s) => ({ value: s, label: s === 'All' ? 'All Speeds' : s }))}
              />

              {/* Language Dropdown */}
              <CustomSelect
                className="filter-custom-select"
                value={selectedLanguage}
                onChange={(val) => setSelectedLanguage(val)}
                options={languages.map((l) => ({ value: l, label: l === 'All' ? 'All Languages' : l }))}
              />

              {hasActiveFilters && (
                <button
                  type="button"
                  className="calm-reset-btn"
                  onClick={handleResetFilters}
                  title="Clear all filters"
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
              )}

              {/* View Toggle */}
              <div className="calm-view-toggle">
                <button
                  type="button"
                  className={`calm-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  type="button"
                  className={`calm-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List view"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* 3. CALM CARDS GRID */}
          {viewMode === 'grid' ? (
            <div className="calm-cards-grid">
              {filteredTests.length === 0 ? (
                <div className="calm-empty-state">
                  <p>No dictations match your selected filters.</p>
                  <button 
                    type="button" 
                    className="calm-reset-btn inline-block mt-2" 
                    onClick={handleResetFilters}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                filteredTests.map((test) => (
                  <div key={test.id} className="calm-test-card">
                    {/* Top Row: Category & Badges */}
                    <div className="calm-card-header">
                      <span className="calm-category-tag">{test.category}</span>
                      <div className="calm-badge-group font-mono">
                        <span className="calm-speed-tag">{test.speed}</span>
                        <span className="calm-lang-tag">{test.language.includes('Hindi') ? 'Hindi' : 'English'}</span>
                      </div>
                    </div>

                    {/* Card Title & Excerpt */}
                    <div className="calm-card-body">
                      <h3 className="calm-card-title">{test.title}</h3>
                      <p className="calm-card-snippet">{test.passageText.slice(0, 150)}...</p>
                    </div>

                    {/* Meta & Action Row */}
                    <div className="calm-card-footer">
                      <div className="calm-meta-info font-mono">
                        <span>{test.duration}</span>
                        <span className="calm-dot">•</span>
                        <span>{test.totalWords} w</span>
                        <span className="calm-dot">•</span>
                        <span>{test.attempts} taken</span>
                      </div>

                      <button 
                        type="button"
                        className="calm-start-btn"
                        onClick={() => onStartTest && onStartTest(test.id)}
                      >
                        <span>Start Test</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* 4. CALM COMPACT LIST VIEW */
            <div className="calm-list-table">
              <div className="calm-list-header-row">
                <span className="th-cell th-title">Dictation Test</span>
                <span className="th-cell th-category">Examination</span>
                <span className="th-cell th-speed">Speed</span>
                <span className="th-cell th-lang">Language</span>
                <span className="th-cell th-specs">Duration & Words</span>
                <span className="th-cell th-attempts">Attempts</span>
                <span className="th-cell th-action"></span>
              </div>

              <div className="calm-list-body">
                {filteredTests.map((test) => (
                  <div key={test.id} className="calm-list-row">
                    <div className="td-cell td-title font-medium text-slate-800">
                      {test.title}
                    </div>
                    <div className="td-cell td-category text-slate-600">
                      {test.category}
                    </div>
                    <div className="td-cell td-speed font-mono">
                      <span className="calm-speed-tag">{test.speed}</span>
                    </div>
                    <div className="td-cell td-lang text-slate-600">
                      {test.language}
                    </div>
                    <div className="td-cell td-specs font-mono text-slate-500">
                      {test.duration} • {test.totalWords} words
                    </div>
                    <div className="td-cell td-attempts font-mono text-slate-500">
                      {test.attempts}
                    </div>
                    <div className="td-cell td-action text-right">
                      <button
                        type="button"
                        className="calm-start-btn"
                        onClick={() => onStartTest && onStartTest(test.id)}
                      >
                        <span>Start</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* 5. CALM TYPING SPEED DRILLS VIEW */
        <div className="calm-typing-view">
          <div className="calm-filter-bar">
            <div className="calm-search-box">
              <Search size={15} className="calm-search-icon" />
              <input
                type="text"
                placeholder="Search typing exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="calm-filter-controls">
              <CustomSelect
                className="filter-custom-select"
                value={selectedTypingLang}
                onChange={(val) => setSelectedTypingLang(val)}
                options={typingLangs.map((l) => ({ value: l, label: l === 'All' ? 'All Layouts' : l }))}
              />
            </div>
          </div>

          <div className="calm-cards-grid">
            {filteredTyping.map((item) => (
              <div key={item.id} className="calm-test-card">
                <div className="calm-card-header">
                  <span className="calm-category-tag">{item.language}</span>
                  <span className="calm-speed-tag">{item.difficulty}</span>
                </div>

                <div className="calm-card-body">
                  <h3 className="calm-card-title">{item.name}</h3>
                </div>

                <div className="calm-card-footer">
                  <div className="calm-meta-info font-mono">
                    <span>{item.time}</span>
                    <span className="calm-dot">•</span>
                    <span>{item.words} words</span>
                  </div>

                  <button 
                    type="button"
                    className="calm-start-btn"
                    onClick={() => onStartTypingTest && onStartTypingTest(item)}
                  >
                    <span>Start Practice</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
