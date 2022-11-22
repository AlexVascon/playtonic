import axios from "axios";
import { promises as fs } from "fs";
import {
  CourtURLResults,
  PaddleCourt,
  refinedCourtDetails,
  Slot,
} from "./types";
import { courtDetailsUrl, courtSlotsUrl } from "./urls";

//main method
export const getPadleData = async () => {
  const allCourtsFromURL = await axios.get(courtDetailsUrl);
  const courtDetailsWeWant: refinedCourtDetails = allCourtsFromURL.data
    .map(getCourtDetails)
    .filter(courtFilter);

  const eachCourtSlotsInformation = await axios.get(courtSlotsUrl);
  const slotDetails: PaddleCourt = eachCourtSlotsInformation.data.map(
    (court: PaddleCourt) => {
      court.slots = court.slots.filter(slotFilter);
      return court;
    }
  );

  const combinedResources = combineInformation(courtDetailsWeWant, slotDetails);

  const finalResult = combinedResources.map((thing: any) => {
    thing.slots = thing.slots.map((ing: any) => {
      const { resource_id, start_date, ...rest } = ing;
      return rest;
    });
    return thing;
  });

  await fs.writeFile("./result.json", JSON.stringify(finalResult, null, 2));
};

// functions
const getCourtDetails = (
  courtURLResults: CourtURLResults
): refinedCourtDetails => {
  const resourceId = courtURLResults.resources[0].resource_id;
  const resourceType = courtURLResults.resources[0].properties.resource_type;
  return {
    name: courtURLResults.tenant_name,
    id: resourceId,
    type: resourceType,
  };
};

const slotFilter = (courtSlot: Slot): boolean => {
  if (Number(courtSlot.start_time.split(":")[0]) < 17) return false;
  if (courtSlot.duration < 90) return false;
  return true;
};

const courtFilter = (court: refinedCourtDetails): boolean => {
  return court.type === "indoor" ? true : false;
};

const combineInformation = (court: any, slot: any) => {
  return court.map((e: any) => {
    const slots = slot.filter((el: any) => el.id === e.resource_id);
    const { id, ...rest } = e;
    return { ...rest, slots };
  });
};

/*
Club Padel Rotterdam:
  court 1:
    2022-11-21:
      17:30:00 (90)
      18:00:00(60)
      18:00:00(90)
      18:00:00(120)
    2022-11-22:
      17:30:00 (90)
      18:00:00(60)
      18:00:00(90)
      18:00:00(120)
  court 2:
    2022-11-21:
      17:30:00 (90)
      18:00:00(60)
      18:00:00(90)
      18:00:00(120)
    2022-11-22:
      17:30:00 (90)
      18:00:00(60)
      18:00:00(90)
      18:00:00(120)

Plaza Padel Rijswijck:
  court 1:
    2022-11-21:
      17:30:00 (90)
      18:00:00(60)
      18:00:00(90)
      18:00:00(120)
    2022-11-22:
      17:30:00 (90)
      18:00:00(60)
      18:00:00(90)
      18:00:00(120)
  court 2:
    2022-11-21:
      17:30:00 (90)
      18:00:00(60)
      18:00:00(90)
      18:00:00(120)
    2022-11-22:
      17:30:00 (90)
      18:00:00(60)
      18:00:00(90)
      18:00:00(120)
*/
