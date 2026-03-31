import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ArrowRightLeft, Calendar, MapPin, Plane } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export type FlightSearchWidgetProps = {
  className?: string;
  defaultFrom?: string;
  defaultTo?: string;
  defaultDate?: Date;
};

function toYmd(d: Date | null) {
  if (!d) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function FlightSearchWidget({
  className,
  defaultFrom = '',
  defaultTo = '',
  defaultDate = new Date(),
}: FlightSearchWidgetProps) {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('oneway');
  const [travellers, setTravellers] = useState(1);
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Premium Economy' | 'Business'>('Economy');
  const formik = useFormik({
    initialValues: {
      from: defaultFrom,
      to: defaultTo,
      date: defaultDate,
    },
    validationSchema: Yup.object({
      from: Yup.string().trim().required('Enter a departure city.'),
      to: Yup.string()
        .trim()
        .required('Enter a destination city.')
        .test('not-same', 'From and To cannot be the same.', function (value) {
          const from = String(this.parent.from || '').trim().toLowerCase();
          const to = String(value || '').trim().toLowerCase();
          return from && to ? from !== to : true;
        }),
      date: Yup.date().required('Select a departure date.'),
    }),
    onSubmit: (values) => {
      const params = new URLSearchParams({
        from: values.from.trim(),
        to: values.to.trim(),
        date: toYmd(values.date),
      });
      navigate(`/search/flights?${params.toString()}`);
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  const swap = () => {
    const prevFrom = formik.values.from;
    formik.setFieldValue('from', formik.values.to);
    formik.setFieldValue('to', prevFrom);
  };

  const onSearch = () => {
    formik.submitForm();
  };

  const shell =
    'border border-[#d8d8d8] rounded-lg px-3 py-2.5 h-[56px] flex items-center bg-white hover:border-mmt-500/40 transition-colors focus-within:border-mmt-500 focus-within:ring-1 focus-within:ring-mmt-500';

  return (
    <div className={cn('bg-white rounded-2xl shadow-[0_6px_28px_rgba(0,0,0,0.12)] border border-[#e8e8e8] overflow-hidden', className)}>
      <div className="px-5 py-4 border-b border-[#efefef] bg-[#fafafa] flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-gray-900 font-extrabold">
            <Plane className="w-5 h-5 text-mmt-500" />
            Flights
          </div>
          <div className="text-xs text-gray-500 font-semibold">MVP: Search → Results</div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                checked={tripType === 'oneway'}
                onChange={() => setTripType('oneway')}
                className="text-mmt-500 focus:ring-mmt-500"
              />
              One Way
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                checked={tripType === 'roundtrip'}
                onChange={() => setTripType('roundtrip')}
                className="text-mmt-500 focus:ring-mmt-500"
              />
              Round Trip
            </label>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="px-3 py-1.5 rounded-full border border-[#e8e8e8] bg-white text-xs font-bold text-gray-700 hover:bg-gray-50"
              onClick={() => setTravellers((t) => Math.max(1, t - 1))}
              aria-label="Decrease travellers"
            >
              -
            </button>
            <div className="px-3 py-1.5 rounded-full border border-[#e8e8e8] bg-white text-xs font-bold text-gray-900">
              {travellers} Traveller{travellers !== 1 ? 's' : ''}
            </div>
            <button
              type="button"
              className="px-3 py-1.5 rounded-full border border-[#e8e8e8] bg-white text-xs font-bold text-gray-700 hover:bg-gray-50"
              onClick={() => setTravellers((t) => Math.min(9, t + 1))}
              aria-label="Increase travellers"
            >
              +
            </button>

            <select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value as any)}
              className="px-3 py-1.5 rounded-full border border-[#e8e8e8] bg-white text-xs font-bold text-gray-900 focus:ring-1 focus:ring-mmt-500"
              aria-label="Cabin class"
            >
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
          <div className="md:col-span-4">
            <div className={shell}>
              <MapPin className="w-5 h-5 text-mmt-500 mr-2 shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-1">
                  From
                </label>
                <Input
                  name="from"
                  value={formik.values.from}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Delhi"
                  className="h-auto border-0 p-0 focus-visible:ring-0 text-[15px] font-semibold placeholder:text-gray-400"
                />
              </div>
            </div>
            {formik.touched.from && formik.errors.from && <p className="mt-1 text-xs font-semibold text-red-600">{formik.errors.from}</p>}
          </div>

          <div className="md:col-span-1 flex md:items-end justify-center pb-1 md:pb-2">
            <button
              type="button"
              onClick={swap}
              className="p-2 rounded-full border border-[#d8d8d8] bg-white text-mmt-500 hover:bg-mmt-50 hover:border-mmt-500/40 transition-colors"
              aria-label="Swap from and to"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="md:col-span-4">
            <div className={shell}>
              <MapPin className="w-5 h-5 text-mmt-500 mr-2 shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-1">
                  To
                </label>
                <Input
                  name="to"
                  value={formik.values.to}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Mumbai"
                  className="h-auto border-0 p-0 focus-visible:ring-0 text-[15px] font-semibold placeholder:text-gray-400"
                />
              </div>
            </div>
            {formik.touched.to && formik.errors.to && <p className="mt-1 text-xs font-semibold text-red-600">{formik.errors.to}</p>}
          </div>

          <div className="md:col-span-3">
            <div className={cn(shell, 'cursor-pointer')}>
              <Calendar className="w-5 h-5 text-mmt-500 mr-2 shrink-0" />
              <div className="flex-1 min-w-0 overflow-hidden">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide leading-none mb-1">
                  Departure
                </label>
                <DatePicker
                  selected={formik.values.date}
                  onChange={(d) => formik.setFieldValue('date', d)}
                  onBlur={formik.handleBlur}
                  dateFormat="dd MMM yyyy"
                  className="w-full bg-transparent text-[15px] font-semibold text-gray-900 focus:outline-none leading-tight cursor-pointer"
                  minDate={new Date()}
                />
              </div>
            </div>
            {formik.touched.date && formik.errors.date && <p className="mt-1 text-xs font-semibold text-red-600">{String(formik.errors.date)}</p>}
          </div>

          <div className="md:col-span-12">
            <Button
              type="button"
              className="w-full h-[52px] rounded-xl bg-mmt-500 hover:bg-mmt-600 text-white font-extrabold text-base border-0 shadow-none"
              onClick={onSearch}
              disabled={!formik.isValid}
            >
              Search Flights
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

