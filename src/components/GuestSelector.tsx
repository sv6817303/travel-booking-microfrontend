import React, { useState, useRef, useEffect } from 'react';
import { Users, Minus, Plus, ChevronDown } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

interface GuestSelectorProps {
    guests: {
        adults: number;
        children: number;
        rooms: number;
    };
    onChange: (guests: { adults: number; children: number; rooms: number }) => void;
    className?: string;
}

export const GuestSelector: React.FC<GuestSelectorProps> = ({ guests, onChange, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const updateGuests = (field: keyof typeof guests, operation: 'increment' | 'decrement') => {
        const newValue = operation === 'increment' ? guests[field] + 1 : guests[field] - 1;

        // Validation rules
        if (field === 'adults' && newValue < 1) return;
        if (field === 'rooms' && newValue < 1) return;
        if (field === 'children' && newValue < 0) return;

        // Logic: If rooms > adults, increase adults
        if (field === 'rooms' && newValue > guests.adults) {
            onChange({ ...guests, rooms: newValue, adults: newValue });
            return;
        }

        onChange({ ...guests, [field]: newValue });
    };

    return (
        <div className={cn("relative", className)} ref={containerRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer border border-[#d8d8d8] rounded-lg px-3 py-2.5 flex items-center justify-between hover:border-mmt-500/40 transition-colors bg-white h-[52px]"
            >
                <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-mmt-500 shrink-0" />
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase leading-none mb-1">Guests & Rooms</span>
                        <span className="font-bold text-gray-900 leading-none">
                            {guests.adults} Adults, {guests.rooms} Room{guests.rooms > 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isOpen && "rotate-180")} />
            </div>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                    {/* Rooms */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <p className="font-bold text-gray-900">Rooms</p>
                            <p className="text-xs text-gray-500">Minimum 1</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => updateGuests('rooms', 'decrement')}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                disabled={guests.rooms <= 1}
                            >
                                <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-4 text-center font-bold">{guests.rooms}</span>
                            <button
                                onClick={() => updateGuests('rooms', 'increment')}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                                <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Adults */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <p className="font-bold text-gray-900">Adults</p>
                            <p className="text-xs text-gray-500">Aged 12+</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => updateGuests('adults', 'decrement')}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                disabled={guests.adults <= 1}
                            >
                                <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-4 text-center font-bold">{guests.adults}</span>
                            <button
                                onClick={() => updateGuests('adults', 'increment')}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                                <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-bold text-gray-900">Children</p>
                            <p className="text-xs text-gray-500">Aged 0-12</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => updateGuests('children', 'decrement')}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                disabled={guests.children <= 0}
                            >
                                <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-4 text-center font-bold">{guests.children}</span>
                            <button
                                onClick={() => updateGuests('children', 'increment')}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                                <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    <Button
                        className="w-full mt-2 bg-mmt-500 hover:bg-mmt-600 text-white border-0"
                        onClick={() => setIsOpen(false)}
                    >
                        Apply
                    </Button>
                </div>
            )}
        </div>
    );
};
