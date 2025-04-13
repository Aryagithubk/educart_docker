import React from "react";
import items from "../../mockData/items.json";
import ItemList from "../itemList/ItemList";
import Banner from "../banner/Banner";
import "./HomePage.css";

function HomePage() {
  return (
    <div>
      <div className="banner_cl">
        <Banner />
      </div>
      <section>
        <ItemList items={items} />
      </section>
    </div>
  );
}

export default HomePage;
