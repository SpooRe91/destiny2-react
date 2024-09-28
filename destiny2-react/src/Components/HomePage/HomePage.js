import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import { getClanInfo, getClanMembers } from "../../Services/requests";
import { ScrollButton } from "../Common/ScrollButton";

import { ClanMemberComponent } from "./ClanMemberComponent";
import styles from "./HomePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUsersSlash } from "@fortawesome/free-solid-svg-icons";

export const HomePage = ({ clanMembers, setClanMembers }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [toShowMembers, setToShowMembers] = useState(false);

  const [clanData, setClanData] = useState(null);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    getClanInfo(signal, controller)
      .then((clanInfo) => {
        if (
          clanInfo?.ErrorCode !== 2101 &&
          clanInfo?.Response.detail !== null &&
          clanInfo?.Response.detail !== undefined &&
          !signal.aborted
        ) {
          setClanData(clanInfo?.Response.detail);
          setIsLoading((state) => false);
        } else {
          if (controller.signal.aborted) {
            return;
          }
          throw new Error("Unable to fetch clan info, please try again later!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // ---------------------------------------------------------------------------------------------------
    return () => {
      controller.abort();
    };
  }, []);

  const fetchClanMembers = () => {
    const controller = new AbortController();
    const { signal } = controller;

    getClanMembers(signal, controller)
      .then((membersData) => {
        if (
          membersData?.ErrorCode !== 2101 &&
          membersData?.Response !== null &&
          membersData?.Response !== undefined &&
          !signal.aborted
        ) {
          setClanMembers((sate) => membersData?.Response.results);
          setIsLoading((state) => false);
          controller.abort();
          return;
        } else {
          if (controller.signal.aborted) {
            return;
          }
          throw new Error(
            "Unble to fetch clan members, please try again later!"
          );
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        controller.abort();
      });

    return;
  };

  const filterHandler = (e) => {
    e.preventDefault();
    setFilterValue(e.target.value.toLowerCase().trim());
  };

  const filtered = clanMembers?.filter((x) =>
    x.bungieNetUserInfo.displayName.toLowerCase().includes(filterValue)
  );
  const creation = new Date(clanData?.creationDate);
  const sortedAdmins = clanMembers?.filter((a) => a.memberType >= 3);
  const sortedMembers = clanMembers
    ?.filter((a) => a.memberType < 3)
    .sort((a, b) =>
      a.bungieNetUserInfo.displayName.localeCompare(
        b.bungieNetUserInfo.displayName
      )
    );

  return (
    <>
      <title>Home</title>

      {
        <div className={styles["home-container"]}>
          {isLoading ? (
            <ClockLoader color="lightblue" size="50px" />
          ) : (
            clanData && (
              <>
                <div className={styles["clan-info"]}>
                  <article className={styles["clan-info-article"]}>
                    <h1 className={styles["welcome-h1"]}>
                      Welcome to the BGs Destiny 2 clan, website!
                      <p>Created by: SpooRe</p>
                    </h1>
                    <h2 className={styles["head-2"]}>CLAN INFO</h2>

                    <h3>{clanData?.name}</h3>
                    <p>
                      Since:{" "}
                      {`${creation?.getDate()}/${creation?.getMonth() +
                        1}/${creation?.getFullYear()}`}
                    </p>

                    <p>Our moto:</p>
                    <h4>{clanData?.motto}</h4>

                    <h4>Callsign: {clanData?.clanInfo.clanCallsign}</h4>

                    <div>{clanData?.about}</div>
                  </article>
                </div>
                <div>
                  <a href="#clan-members">
                    <button
                      className={styles["showMembers"]}
                      onClick={() => [
                        setToShowMembers((state) => !state),
                        !clanMembers ? fetchClanMembers() : null,
                        //this will tell the screen to scroll down once the state is changed from false to true, with a slight delay
                        !toShowMembers
                          ? setTimeout(() => {
                              window.scroll({ top: 800, behavior: "auto" });
                            })
                          : null,
                      ]}
                      style={
                        toShowMembers
                          ? { color: "coral" }
                          : { color: "lightblue" }
                      }
                    >
                      {!toShowMembers ? (
                        <>
                          {"Show members"} <FontAwesomeIcon icon={faUsers} />
                        </>
                      ) : (
                        <>
                          {"Hide members"}{" "}
                          <FontAwesomeIcon icon={faUsersSlash} />
                        </>
                      )}
                    </button>
                  </a>
                </div>

                {toShowMembers ? (
                  !clanMembers ? null : (
                    <>
                      <h1 className={styles["clan-member-sign"]}>
                        CLAN MEMBERS
                      </h1>
                      <div>
                        <h1 className={styles["clan-member-search-sign"]}>
                          &#11167; Search for guardian &#11167;
                        </h1>
                        <form className={styles["search"]} method="GET">
                          {
                            <input
                              type="text"
                              className={styles["input-field"]}
                              placeholder="Guardian name..."
                              name="search"
                              defaultValue={filterValue}
                              onChange={filterHandler}
                            />
                          }
                          {filterValue ? (
                            filtered?.length <= 0 ? (
                              <p className={styles["form-search-error"]}>
                                No clan members found!
                              </p>
                            ) : (
                              <p className={styles["form-search-confirmation"]}>
                                Found{" "}
                                {filtered.length === 1
                                  ? `${filtered.length} clan member`
                                  : `${filtered.length} clan members`}
                              </p>
                            )
                          ) : null}
                        </form>
                      </div>
                    </>
                  )
                ) : null}
                {toShowMembers ? (
                  <div
                    id="clan-members"
                    div
                    className={styles["clan-member-container"]}
                  >
                    {toShowMembers ? (
                      !clanMembers ? (
                        <div className={styles["loading-message"]}>
                          <h2>Fetching clan members...</h2>
                          <ClockLoader color="lightblue" size="50px" />
                        </div>
                      ) : (
                        <>
                          {filterValue ? (
                            filtered
                              ?.sort((a, b) => b.memberType - a.memberType)
                              .map((el) => (
                                <ClanMemberComponent
                                  key={el.destinyUserInfo.membershipId}
                                  data={el}
                                />
                              ))
                          ) : (
                            <>
                              {sortedAdmins
                                ?.sort((a, b) => b.memberType - a.memberType)
                                .map((el) => (
                                  <ClanMemberComponent
                                    key={el.destinyUserInfo.membershipId}
                                    data={el}
                                  />
                                ))}
                              {sortedMembers
                                ?.sort((a, b) => b.memberType - a.memberType)
                                .map((el) => (
                                  <ClanMemberComponent
                                    key={el.destinyUserInfo.membershipId}
                                    data={el}
                                  />
                                ))}
                            </>
                          )}
                        </>
                      )
                    ) : null}
                  </div>
                ) : null}
              </>
            )
          )}
          <ScrollButton />
        </div>
      }
    </>
  );
};
