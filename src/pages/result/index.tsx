import styles from './index.less';
import { useState, useEffect } from 'react';
import { Image, Modal, Checkbox } from 'antd-mobile';
import classnames from 'classnames';
import { fetchCityData } from '@/services/city-data';

export default function ResultPage() {
  const [buttonVisible, setButtonVisible] = useState(true);
  const [cityText, setCityText] = useState<any>('');

  useEffect(() => {
    initPageData();
  }, []);

  const initPageData = async () => {
    // 检查是否有勾选城市，没有的话跳回首页
    let cityData = localStorage.getItem('city_text');
    if (cityData == '' || cityData == null) {
      location.href = `#/`;
      return;
    }
    cityData = String(cityData);
    cityData = cityData.replace(new RegExp('直辖市/特别行政区', 'gm'), '');
    cityData = cityData.replace(new RegExp('海外地区', 'gm'), '');
    setCityText(cityData);
  };

  const handleHideOnChange = async (hide: boolean) => {
    if (hide == true) {
      // 隐藏省份
      let cityData = localStorage.getItem('city_text');
      let allData = await fetchCityData();
      allData.map((item: any) => {
        cityData = String(cityData);
        cityData = cityData.replace(new RegExp(item.provinceName, 'gm'), '');
      });
      cityData = String(cityData);
      cityData = cityData.replace(new RegExp('直辖市/特别行政区', 'gm'), '');
      cityData = cityData.replace(new RegExp('海外地区', 'gm'), '');
      setCityText(cityData);
    } else {
      // 不隐藏省份
      initPageData();
    }
  };

  const handleSaveOnClick = () => {
    setButtonVisible(false);
    Modal.alert({
      title: '温馨提示',
      content:
        '纪念版准备就绪，请自行截图保留；若页面太长，推荐使用手机截长图功能。',
      onConfirm: () => {
        console.log('Confirmed');
      },
    });
  };

  const handleBackOnClick = () => {
    location.href = `#/`;
  };

  const handleCardOnClick = () => {
    setButtonVisible(true);
  };

  return (
    <div style={styles.page}>
      <div className={styles.card}>
        <div className={styles.top} onClick={handleCardOnClick}>
          <Image
            src={require('@/assets/header.jpeg')}
            alt=""
            className={styles.t1}
          />
        </div>
        <div className={styles.box} onClick={handleCardOnClick}>
          <div className={styles.t1}>请收下绿色行程卡</div>
          <div className={styles.h1}>2020***2022的动态行程卡</div>
          <div className={styles.h2}>停止于: 2022.12.13 00:00:00</div>{' '}
          <Image
            src={require('@/assets/run.png')}
            alt=""
            className={styles.run}
          />
          <div className={styles.line}></div>
          <div className={styles.total}>
            <span className={styles.p1}>您于 2020 - 2022 年到达或旅经:</span>{' '}
            <span className={styles.p2}>
              <b> {cityText}</b>
            </span>
          </div>
        </div>
        <div className={styles.bottom} onClick={handleCardOnClick}>
          <div className={styles.t1}>
            12月13日0时起，正式下线“通信行程卡”服务
            <br />
            “通信行程卡”
            短信、网页、微信小程序、支付宝小程序、APP等所有渠道同步下线!
          </div>
          <div className={styles.end}>
            <span className={styles.goodbye}>三年了，再见</span>
            <br />
            <span className={styles.domain}>xingchengka.com</span>
          </div>
        </div>

        <div
          className={classnames({
            [`${styles.bottomButton}`]: true,
            [`${styles.showButton}`]: buttonVisible,
          })}
        >
          <div className={styles.save} onClick={handleSaveOnClick}>
            🚀 开始截图
          </div>
          <div className={styles.back}>
            <Checkbox
              style={{
                '--icon-size': '12px',
                '--font-size': '10px',
                '--gap': '6px',
                color: '#000',
              }}
              onChange={(e: any) => {
                handleHideOnChange(e);
              }}
            >
              隐藏省份名
            </Checkbox>
          </div>
          <div className={styles.back} onClick={handleBackOnClick}>
            重新填写
          </div>
        </div>

      </div>
    </div>
  );
}
