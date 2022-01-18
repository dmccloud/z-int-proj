import { RouteComponentProps } from "@reach/router";
import { gql, useQuery } from "@apollo/client";
import EventTile from "../components/event-tile";
import Loading from "../components/loading";
import Header from "../components/header";

export const GET_EVENTS = gql`
  query Events($pageNum: Int) {
    events(pageNum: $pageNum) {
      id
      name
      url
      image
      start
      Venue {
        name
        city
        address
      }
      isBooked
    }
  }
`;

interface EventsProps extends RouteComponentProps {}

const Events: React.FC<EventsProps> = () => {
  const { data, loading, error } = useQuery(GET_EVENTS);
  //onst [pageNum, setPageNum] = useState(0)
  console.log(data);
  if (loading) return <Loading />;
  if (error || !data) return <p>ERROR</p>;

  return (
    <div>
      <Header image={data.events[0]?.image} />
      {data.events?.map((event: any) => {
        console.log(event);
        return <EventTile key={event.id} event={event} />;
      })}
    </div>
  );
};

export default Events;
