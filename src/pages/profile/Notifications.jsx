/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import isThisWeek from 'date-fns/isThisWeek';
import isThisMonth from 'date-fns/isThisMonth';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { RiNotification4Line } from 'react-icons/ri';
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

const user = { ...JSON.parse(localStorage.getItem('user')) };

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
  const {
    filter, datesearch, daterange, filteraction
  } = queryString.parse(search);
  console.log(store);
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
    console.log(value);
    // { [name]: value }
    if (name === 'datesearch') {
      setChecked(!checked);
      const dat = paramsx.get(name);
      console.log('From here ', dat);
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

  const mapToView = (items) => items.length > 0 && items.map((item) => (
    <Card className="my-5 hover-wema" key={Math.random()}>
      <CardContent>
        <div className="d-flex">
          <div>
            <RiNotification4Line className="text-wema font-1-5" />
          </div>
          <div className="pl-1">
            {item?.data?.title}
          </div>
        </div>
        <div>
          <small>
            {item?.data?.type}
          </small>
        </div>
      </CardContent>
    </Card>
  ));

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

  const temp = (
    <div className="login-form-container p-20 mt-5">
      <div className="w-100">
        <div className="login-form pb-5h">
          <h3 className="bold text-dark mt-2">
            <Badge badgeContent={store?.data?.data?.length} color="secondary">
              <span className=" border-bottom">
                Notifications
              </span>
            </Badge>
          </h3>
          <div className="row">
            {
              week.length > 0
             && (
               <div className="py-3 ">
                 <h5 className="bold text-dark mb-2">
                   <Badge badgeContent={week.length} color="secondary">
                     this week
                   </Badge>

                 </h5>
                 {
                   mapToView(week)
                 }
               </div>
             )
            }
            {
              month.length > 0
             && (
               <div className="py-3 ">
                 <h5 className="bold text-dark mb-2">
                   <Badge badgeContent={month.length} color="secondary">
                     this month
                   </Badge>

                 </h5>
                 {
                   mapToView(month)
                 }
               </div>
             )
            }
            {
              old.length > 0
             && (
               <div className="py-3 ">
                 <h5 className="bold text-dark mb-2">
                   <Badge badgeContent={month.length} color="secondary">
                     Earlier
                   </Badge>

                 </h5>
                 {
                   mapToView(old)
                 }
               </div>
             )
            }
          </div>
        </div>
      </div>
    </div>
  );
  console.log(dateRanger);
  return (
    <div className={setCurrent === undefined ? ' pb-5h' : ''}>
      <div>
        <div>
          Status
          <select name="filter" id="" value={filter} onChange={onChange}>
            <option value="all">all</option>
            <option value="un_read">Unread</option>
            <option value="read">read</option>
          </select>
          module
          <select name="filteraction" id="" value={filteraction} onChange={onChange}>
            <option value="approval">approval</option>
            <option value="invites">invites</option>
          </select>
          date search
          {/* <input type="checkbox" name="datesearch" id="" value={checked} onChange={onChange} /> */}
          <select name="datesearch" id="" value={datesearch} onChange={onChange}>
            <option value="se">date search</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {datesearch === 'true'
            ? (
              <>
                date range
                <select name="daterange" value={daterange} onChange={onChange}>
                  <option value="custom">Custom</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last7days">Last 7 days</option>
                  <option value="last30days">Last 30 days</option>
                  <option value="thismonth">This Month</option>
                </select>
                Date Range Results
                <div id="daterangedata">
                  {daterange === 'custom'
                    ? <DateRangePicker format="MM-dd-yyyy" onChange={(e) => setDateRange([formatDate(new Date(e[0])), formatDate(new Date(e[1]))])} />
                    : <input type="text" value={getDateRange()} readOnly />}
                </div>
              </>
            ) : null}

        </div>
        <div>
          <button type="button">Mark all as Read</button>
        </div>
      </div>
      <div className="w-100 margin-center m-t-40 ">
        <PageTemp
          view={temp}
          status={store?.status}
          data={store.data?.data?.notifications}
        />

      </div>
    </div>

  );
};
export default Notifications;
