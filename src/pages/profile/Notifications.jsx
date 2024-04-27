/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import isThisWeek from 'date-fns/isThisWeek';
import isThisMonth from 'date-fns/isThisMonth';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import { useHistory, useLocation, useParams } from 'react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import queryString from 'query-string';
// import { DateRangePicker } from 'rsuite';
import DateRangePicker from 'rsuite/DateRangePicker';
import { notifications } from '../../redux/actions/profileActions';
// import Loader from '../../components/microComponents/loader';
// import NoData from '../authentication/NoData';
import PageTemp from '../../components/temps/PageTemp';
import { notifier } from '../../utilities/stringOperations';
import SelectInput from '../../components/form/inputs/SelectInput';
import {
  statusCategoryOption, moduleCategoryOption, dateSearchOption, dateRangeOption
} from '../../utilities/dummyData';

const user = { ...JSON.parse(localStorage.getItem('user')) };

const NotificationTable = ({ children }) => (
  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th>Title</th>
        <th scope="col">Type</th>
        <th scope="col">Created At</th>
        {/* <th scope="col">Action</th> */}
      </tr>
    </thead>
    <tbody>
      {children}
    </tbody>
  </table>
);

const Notifications = ({ setCurrent }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile.notifications);
  const history = useHistory();
  const location = useLocation();
  const [month, setMonth] = useState([]);
  const [week, setWeek] = useState([]);
  const [old, setOld] = useState([]);
  const { search } = useLocation();
  const [selectedRange, setSelectedRange] = useState('');
  const [dateRanger, setDateRange] = useState([]);
  const [checked, setChecked] = useState(false);
  const [storeData, setStoreData] = useState([]);
  const {
    filter, datesearch, daterange, filteraction
  } = queryString.parse(search);
  // console.log('notif', store);
  // console.log(values);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const monthh = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${monthh}-${day}-${year}`;
  };
  const handleChange = () => {
    setChecked(!checked);
  };
  const getDateRange = () => {
    const today = new Date();
    const startDate = new Date();
    const endDate = new Date();

    if (daterange === 'today') {
      startDate.setDate(today.getDate());
      endDate.setDate(today.getDate());
    } else if (daterange === 'yesterday') {
      startDate.setDate(today.getDate() - 1);
      endDate.setDate(today.getDate());
    } else if (daterange === 'last7days') {
      startDate.setDate(today.getDate() - 6); // Start 6 days ago
      endDate.setDate(today.getDate()); // Today
    } else if (daterange === 'last30days') {
      startDate.setDate(today.getDate() - 29); // Start 29 days ago
      endDate.setDate(today.getDate()); // Today
    }

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const getDateRanges = () => {
    const today = new Date();
    const startDate = new Date();
    const endDate = new Date();

    if (daterange === 'today') {
      startDate.setDate(today.getDate());
      endDate.setDate(today.getDate());
    } else if (daterange === 'yesterday') {
      startDate.setDate(today.getDate() - 1);
      endDate.setDate(today.getDate());
    } else if (daterange === 'last7days') {
      startDate.setDate(today.getDate() - 6); // Start 6 days ago
      endDate.setDate(today.getDate()); // Today
    } else if (daterange === 'last30days') {
      startDate.setDate(today.getDate() - 29); // Start 29 days ago
      endDate.setDate(today.getDate()); // Today
    }

    return [formatDate(startDate), formatDate(endDate)];
  };

  const onChange = (event) => {
    const { name, value } = event?.target;
    setSelectedRange(value);
    const paramsx = new URLSearchParams(location.search);
    // console.log(value);
    // { [name]: value }
    if (name === 'datesearch') {
      setChecked(!checked);
      const dat = paramsx.get(name);
      // console.log('From here ', dat);
      paramsx.set(name, !(dat === 'true'));
      if (value === 'false') {
        paramsx.delete('daterange');
      }
    } else if (value) {
      paramsx.set(name, value.replace(/\s/g, '%20')); // Replace whitespace with %20
    } else {
      paramsx.delete(name);
    }

    history.push({ pathname: location.pathname, search: paramsx.toString() });
  };

  useEffect(() => {
    dispatch(notifications({
      filter,
      datesearch: datesearch === 'true' ? 1 : 0,
      daterange: dateRanger.length > 0 ? dateRanger : getDateRanges(),
      filteraction
    }));
  }, [dispatch]);

  useEffect(() => {
    if (store.status === 'initial') {
      if (setCurrent !== undefined) {
        setCurrent('My notifications');
      }
      dispatch(notifications({
        filter,
        datesearch,
        daterange: getDateRanges(),
        filteraction
      }));
    }

    if (store.status === 'success') {
      const weekData = store.data?.data?.notifications?.filter((item) => isThisWeek(new Date(item.dateCreated)));
      const monthData = store.data?.data?.notifications?.filter((item) => isThisMonth(new Date(item.dateCreated))
        && !isThisWeek(new Date(item.dateCreated)));
      const joinArr = weekData.concat(monthData);
      const oldData = store.data?.data?.notifications?.filter((item) => joinArr.indexOf(item) === -1);
      setOld(oldData);
      setMonth(monthData);
      setWeek(weekData);
      setStoreData(store?.data?.data?.notifications ?? []);
    }
    if (store?.status === 'failed') {
      notifier({
        title: 'error',
        type: 'error',
        text: store?.data
          || store?.data?.message
          || 'could not load your projects'
      });
    }
  }, [store.status]);

  const converDate = (createdAt) => {
    const isDate = new Date(createdAt);

    const isDay = isDate.getDate();
    const isMonth = isDate.getMonth() + 1;
    const isYear = isDate.getFullYear();
    // return `${isDay < 10 ? '0' + isDay : isDay}-${isMonth < 10 ? '0' + isMonth : isMonth}-${isYear}`;
    return `${isDay < 10 ? `0${isDay}` : isDay}-${isMonth < 10 ? `0${isMonth}` : isMonth}-${isYear}`;
  };

  const mapToView = (items) => items.length > 0 && items.map((item, i) => (
    <tr key={item.id}>
      <td>{i + 1}</td>
      <td>{item?.data?.title}</td>
      <td>{item?.data?.type || '-'}</td>
      <td>{converDate(item?.created_at)}</td>
      {/* <td>
        <button type="button">View Details</button>
      </td> */}
    </tr>
  ));

  const temp = (
    <>
      {
        week.length > 0
        && (
          <div className="py-1">
            {/* <h6 className="bold text-dark mb-2">
              <Badge badgeContent={week.length} color="secondary">
                this week
              </Badge>
            </h6> */}
            <NotificationTable>
              {
                mapToView(week)
              }
            </NotificationTable>
          </div>
        )
      }
      {
        month.length > 0
        && (
          <div className="py-1">
            <NotificationTable>
              {
                mapToView(month)
              }
            </NotificationTable>
          </div>
        )
      }
      {
        old.length > 0
        && (
          <div className="py-1">
            <NotificationTable>
              {
                mapToView(old)
              }
            </NotificationTable>
          </div>
        )
      }
    </>
  );
  // console.log(dateRanger);

  return (
    // <div className={setCurrent === undefined ? ' pb-5h pl-4' : ''}>
    <div className="pb-5h pl-4">
      <div className="pt-3">
        <h3 className="bold text-dark mt-2">
          <Badge badgeContent={storeData && storeData.length} color="secondary">
            <span>
              Notifications
            </span>
          </Badge>
        </h3>
        <div className="d-flex align-items-center">
          <div>
            <SelectInput
              options={statusCategoryOption}
              valueIndex="value"
              optionIndex="desc"
              titleIndex="type"
              value={filter}
              onChange={onChange}
              name="filter"
              className="theme-font font-black font-14 mr-4"
            />
          </div>
          <div>
            <SelectInput
              options={moduleCategoryOption}
              valueIndex="value"
              optionIndex="desc"
              titleIndex="type"
              value={filteraction}
              onChange={onChange}
              name="filteraction"
              className="theme-font font-black font-14 mr-4"
            />
          </div>
          <div>
            {/* <input type="checkbox" name="datesearch" id="" value={checked} onChange={onChange} /> */}
            <SelectInput
              options={dateSearchOption}
              valueIndex="value"
              optionIndex="desc"
              titleIndex="type"
              value={datesearch}
              onChange={onChange}
              name="datesearch"
              className="theme-font font-black font-14 mr-4"
            />
          </div>
          {datesearch === 'true'
            ? (
              <div className="d-flex">
                <SelectInput
                  options={dateRangeOption}
                  valueIndex="value"
                  optionIndex="desc"
                  titleIndex="type"
                  value={daterange}
                  onChange={onChange}
                  name="daterange"
                  className="theme-font font-black h-25 font-14 mr-4"
                />
                <div className="theme-font font-black font-12 mr-4" id="daterangedata">
                  {daterange === 'custom'
                    ? <DateRangePicker format="MM-dd-yyyy" size="lg" onChange={(e) => setDateRange([formatDate(new Date(e[0])), formatDate(new Date(e[1]))])} />
                    : <div className="p-3 bg-white border-1">{getDateRange()}</div>}
                </div>
              </div>
            ) : null}
          <div>
            <button type="button" className="text-theme-blue float-right mb-3  viewMoreBtn">Mark all as Read</button>
          </div>
        </div>
        <div className="w-100 margin-center mt-1">
          <PageTemp
            view={temp}
            status={store?.status}
            data={store.data?.data?.notifications}
          />
        </div>
      </div>
    </div>

  );
};
export default Notifications;
