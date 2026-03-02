import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, MapPin, GraduationCap, Star, Users } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';

function randomColor() {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface Mentor {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  coverPhoto?: string;
  bio: string;
  location: string;
  occupation: string;
  education: string;
  specialties: string[];
  ranking: number;
  totalMentees: number;
}

interface FilterState {
  search: string;
  specialty: string;
  location: string;
}

const MentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => {
  const randomBg = randomColor();
  const hasCover = mentor.coverPhoto && mentor.coverPhoto !== "https://via.placeholder.com/1200x300?text=Cover";
  const gradientFrom = hasCover ? 'rgba(0, 0, 0, 0.6)' : hexToRgba(randomBg, 0.6);
  return (
  <Link
    to={`/profile/mentor/${mentor._id}`}
    className="group flex flex-col overflow-hidden border border-amber-500/20 bg-white dark:bg-gray-900 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300"
  >
    <div
      className="relative overflow-hidden h-48"
      style={{
        background: hasCover ? `url(${mentor.coverPhoto}) center/cover` : randomBg
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={mentor.avatar || "/placeholder.svg"}
          alt={`${mentor.name}'s avatar`}
          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
        />
      </div>
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${gradientFrom}, transparent)` }} />
      <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
        <span className="text-xs font-medium" style={{ color: hasCover ? 'white' : 'black' }}>{(mentor.ranking ?? 0).toFixed(1)}</span>
        <span className="text-xs" style={{ color: hasCover ? '#d1d5db' : 'gray' }}>({mentor.totalMentees ?? 0} mentees)</span>
      </div>
    </div>

    <div className="p-5 flex flex-col flex-1">
      <div className="mb-3">
        <h2 className="font-serif-display text-lg font-bold text-gray-900 dark:text-stone-100 mb-0.5">
          {mentor.name}
        </h2>
        <p className="text-xs tracking-widest uppercase font-medium text-amber-500">
          {mentor.occupation}
        </p>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2 flex-1">
        {mentor.bio}
      </p>

      <div className="space-y-1.5 mb-4">
        {mentor.location && (
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <MapPin className="h-3 w-3 text-amber-500/60 flex-shrink-0" />
            {mentor.location}
          </div>
        )}
        {mentor.education && (
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <GraduationCap className="h-3 w-3 text-amber-500/60 flex-shrink-0" />
            {mentor.education}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {mentor.specialties.slice(0, 3).map((specialty, index) => (
          <span
            key={index}
            className="px-2.5 py-1 text-xs font-medium border border-amber-500/20 text-gray-600 dark:text-gray-400"
          >
            {specialty}
          </span>
        ))}
        {mentor.specialties.length > 3 && (
          <span className="px-2.5 py-1 text-xs font-medium text-amber-500">
            +{mentor.specialties.length - 3}
          </span>
        )}
      </div>
      </div>
    </Link>
  );
};

const AllMentors: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filters, setFilters] = useState<FilterState>({ search: '', specialty: '', location: '' });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get<Mentor[]>(`${import.meta.env.VITE_BACKEND_URL}/api/mentor/`);
        setMentors(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch mentors. Please try again later.');
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const filteredMentors = mentors.filter(mentor => {
    const searchLower = filters.search.toLowerCase();
    return (
      (mentor.name.toLowerCase().includes(searchLower) ||
        mentor.email.toLowerCase().includes(searchLower) ||
        mentor.bio.toLowerCase().includes(searchLower) ||
        mentor.location.toLowerCase().includes(searchLower) ||
        mentor.occupation.toLowerCase().includes(searchLower) ||
        mentor.education.toLowerCase().includes(searchLower) ||
        mentor.specialties.some(s => s.toLowerCase().includes(searchLower))) &&
      (filters.specialty === '' || mentor.specialties.includes(filters.specialty)) &&
      (filters.location === '' || mentor.location.includes(filters.location))
    );
  });


  if (loading) return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-0.5 bg-amber-500 mx-auto mb-4 animate-pulse" />
        <p className="text-sm tracking-widest uppercase text-gray-500 dark:text-gray-400">Loading mentors...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-0.5 bg-red-500 mx-auto mb-4" />
        <p className="text-sm text-red-500">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950">
      <div className="border-b border-amber-500/20 bg-white dark:bg-gray-900 px-6 md:px-16 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block w-6 h-px bg-amber-500 flex-shrink-0" />
            <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Experts</span>
          </div>
          <h1 className="font-serif-display text-5xl font-black text-gray-900 dark:text-stone-100 mb-2">
            Find your <em className="not-italic text-amber-500">mentor</em>
          </h1>
          <div className="flex items-center gap-3 mt-4 text-sm text-gray-500 dark:text-gray-400">
            <Users className="h-4 w-4 text-amber-500/60" />
            <span>{mentors.length} mentors available</span>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 py-10 bg-stone-50 dark:bg-gray-950 border-b border-amber-500/15">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              type="text"
              name="search"
              placeholder="Search by name, skill, location..."
              value={filters.search}
              onChange={handleFilterChange}
              className="pl-10"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="md:w-56">
            <Select value={filters.specialty} onValueChange={(v) => setFilters(prev => ({ ...prev, specialty: v === 'all' ? '' : v }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {[...new Set(mentors
                  .flatMap(m => m.specialties)
                  .filter(Boolean))].map((s, i) => (
                  <SelectItem key={i} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:w-48">
            <Select value={filters.location} onValueChange={(v) => setFilters(prev => ({ ...prev, location: v === 'all' ? '' : v }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {[...new Set(mentors
                  .map(m => m.location)
                  .filter(Boolean))].map((l, i) => (
                  <SelectItem key={i} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 py-12">
        <div className="max-w-7xl mx-auto">
          {filteredMentors.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-8 h-0.5 bg-amber-500/30 mx-auto mb-6" />
              <p className="text-sm tracking-widest uppercase text-gray-400">No mentors found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map(mentor => (
                <MentorCard key={mentor._id} mentor={mentor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllMentors;