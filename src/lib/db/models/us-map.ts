import { USMapNodeId, DieColor } from './constants';

export interface MapNode {
  color: DieColor;
  neighbors: USMapNodeId[];
}

export const USMap: Record<USMapNodeId, MapNode> = {
  [USMapNodeId.AK]: {
    color: DieColor.Orange,
    neighbors: []
  },
  [USMapNodeId.AL]: {
    color: DieColor.Yellow,
    neighbors: [USMapNodeId.MS, USMapNodeId.TN, USMapNodeId.GA, USMapNodeId.FL],
  },
  [USMapNodeId.AR]: {
    color: DieColor.Yellow,
    neighbors: [USMapNodeId.TX, USMapNodeId.OK, USMapNodeId.MO, USMapNodeId.TN, USMapNodeId.MS, USMapNodeId.LA],
  },
  [USMapNodeId.AZ]: {
    color: DieColor.Orange,
    neighbors: [USMapNodeId.CA, USMapNodeId.NV, USMapNodeId.UT, USMapNodeId.NM],
  },
  [USMapNodeId.CA]: {
    color: DieColor.Orange,
    neighbors: [USMapNodeId.OR, USMapNodeId.NV, USMapNodeId.AZ],
  },
  [USMapNodeId.CO]: {
    color: DieColor.Green,
    neighbors: [USMapNodeId.UT, USMapNodeId.WY, USMapNodeId.NE, USMapNodeId.KS, USMapNodeId.OK, USMapNodeId.NM],
  },
  [USMapNodeId.CT]: {
    color: DieColor.Purple,
    neighbors: [USMapNodeId.NJ, USMapNodeId.NY, USMapNodeId.MA, USMapNodeId.RI],
  },
  [USMapNodeId.DE]: {
    color: DieColor.Red,
    neighbors: [USMapNodeId.MD, USMapNodeId.PA, USMapNodeId.NJ],
  },
  [USMapNodeId.FL]: {
    color: DieColor.Yellow,
    neighbors: [USMapNodeId.AL, USMapNodeId.GA],
  },
  [USMapNodeId.GA]: {
    color: DieColor.Red,
    neighbors: [USMapNodeId.FL, USMapNodeId.AL, USMapNodeId.TN, USMapNodeId.NC, USMapNodeId.SC],
  },
  [USMapNodeId.HI]: {
    color: DieColor.Orange,
    neighbors: [],
  },
  [USMapNodeId.IA]: {
    color: DieColor.Blue,
    neighbors: [USMapNodeId.MO, USMapNodeId.NE, USMapNodeId.SD, USMapNodeId.MN, USMapNodeId.WI, USMapNodeId.IL],
  },
  [USMapNodeId.ID]: {
    color: DieColor.Orange,
    neighbors: [USMapNodeId.WA, USMapNodeId.OR, USMapNodeId.NV, USMapNodeId.UT, USMapNodeId.WY, USMapNodeId.MT],
  },
  [USMapNodeId.IL]: {
    color: DieColor.Blue,
    neighbors: [USMapNodeId.KY, USMapNodeId.MO, USMapNodeId.IA, USMapNodeId.WI, USMapNodeId.IN],
  },
  [USMapNodeId.IN]: {
    color: DieColor.Blue,
    neighbors: [USMapNodeId.IL, USMapNodeId.KY, USMapNodeId.OH, USMapNodeId.MI],
  },
  [USMapNodeId.KS]: {
    color: DieColor.Green,
    neighbors: [USMapNodeId.OK, USMapNodeId.CO, USMapNodeId.NE, USMapNodeId.MO],
  },
  [USMapNodeId.KY]: {
    color: DieColor.Yellow,
    neighbors: [USMapNodeId.TN, USMapNodeId.MO, USMapNodeId.IL, USMapNodeId.IN, USMapNodeId.OH, USMapNodeId.WV, USMapNodeId.VA],
  },
  [USMapNodeId.LA]: {
    color: DieColor.Yellow,
    neighbors: [USMapNodeId.TX, USMapNodeId.AR, USMapNodeId.MS],
  },
  [USMapNodeId.MA]: {
    color: DieColor.Purple,
    neighbors: [USMapNodeId.NY, USMapNodeId.CT, USMapNodeId.RI, USMapNodeId.NH, USMapNodeId.VT],
  },
  [USMapNodeId.MD]: {
    color: DieColor.Red,
    neighbors: [USMapNodeId.VA, USMapNodeId.PA, USMapNodeId.DE],
  },
  [USMapNodeId.ME]: {
    color: DieColor.Purple,
    neighbors: [USMapNodeId.NH],
  },
  [USMapNodeId.MI]: {
    color: DieColor.Blue,
    neighbors: [USMapNodeId.WI, USMapNodeId.IN, USMapNodeId.OH],
  },
  [USMapNodeId.MN]: {
    color: DieColor.Blue,
    neighbors: [USMapNodeId.ND, USMapNodeId.SD, USMapNodeId.IA, USMapNodeId.WI],
  },
  [USMapNodeId.MO]: {
    color: DieColor.Yellow,
    neighbors: [USMapNodeId.AR, USMapNodeId.OK, USMapNodeId.KS, USMapNodeId.NE, USMapNodeId.IA, USMapNodeId.IL, USMapNodeId.KY, USMapNodeId.TN],
  },
  [USMapNodeId.MS]: {
    color: DieColor.Yellow, 
    neighbors: [USMapNodeId.LA, USMapNodeId.AR, USMapNodeId.TN, USMapNodeId.AL],
  },
  [USMapNodeId.MT]: {
    color: DieColor.Blue,
    neighbors: [USMapNodeId.ID, USMapNodeId.WY, USMapNodeId.SD, USMapNodeId.ND],
  },
  [USMapNodeId.NC]: {
    color: DieColor.Red,
    neighbors: [USMapNodeId.SC, USMapNodeId.GA, USMapNodeId.TN, USMapNodeId.VA],
  },
  [USMapNodeId.ND]: {
    color: DieColor.Blue,
    neighbors: [USMapNodeId.MT, USMapNodeId.SD, USMapNodeId.MN],
  },
  [USMapNodeId.NE]: {
    color: DieColor.Green,
    neighbors: [USMapNodeId.CO, USMapNodeId.WY, USMapNodeId.SD, USMapNodeId.IA, USMapNodeId.MO, USMapNodeId.KS],
  },
  [USMapNodeId.NH]: {
    color: DieColor.Purple,
    neighbors: [USMapNodeId.VT, USMapNodeId.MA, USMapNodeId.ME],
  },
  [USMapNodeId.NJ]: {
    color: DieColor.Purple,
    neighbors: [USMapNodeId.DE, USMapNodeId.PA, USMapNodeId.NY, USMapNodeId.CT],
  },
  [USMapNodeId.NM]: {
    color: DieColor.Green,
    neighbors: [USMapNodeId.AZ, USMapNodeId.CO, USMapNodeId.OK, USMapNodeId.TX],
  },
  [USMapNodeId.NV]: {
    color: DieColor.Orange,
    neighbors: [USMapNodeId.CA, USMapNodeId.OR, USMapNodeId.ID, USMapNodeId.UT, USMapNodeId.AZ],
  },
  [USMapNodeId.NY]: {
    color: DieColor.Purple,
    neighbors: [USMapNodeId.VT, USMapNodeId.MA, USMapNodeId.CT, USMapNodeId.NJ, USMapNodeId.PA],
  },
  [USMapNodeId.OH]: {
    color: DieColor.Red,
    neighbors: [USMapNodeId.MI, USMapNodeId.IN, USMapNodeId.KY, USMapNodeId.WV, USMapNodeId.PA]
  },
  [USMapNodeId.OK]: {
    color: DieColor.Green,
    neighbors: [USMapNodeId.TX, USMapNodeId.NM, USMapNodeId.CO, USMapNodeId.KS, USMapNodeId.MO, USMapNodeId.AR],
  },
  [USMapNodeId.OR]: {
    color: DieColor.Orange,
    neighbors: [USMapNodeId.WA, USMapNodeId.ID, USMapNodeId.NV, USMapNodeId.CA],
  },
  [USMapNodeId.PA]: {
    color: DieColor.Red,
    neighbors: [USMapNodeId.OH, USMapNodeId.WV, USMapNodeId.VA, USMapNodeId.MD, USMapNodeId.DE, USMapNodeId.NJ, USMapNodeId.NY],
  },
  [USMapNodeId.RI]: {
    color: DieColor.Purple,
    neighbors: [USMapNodeId.MA, USMapNodeId.CT],
  },
  [USMapNodeId.SC]: {
    color: DieColor.Red,
    neighbors: [USMapNodeId.GA, USMapNodeId.NC],
  },
  [USMapNodeId.SD]: {
    color: DieColor.Blue,
    neighbors: [USMapNodeId.NE, USMapNodeId.WY, USMapNodeId.MT, USMapNodeId.ND, USMapNodeId.MN, USMapNodeId.IA],
  },
  [USMapNodeId.TN]: {
    color: DieColor.Yellow,
    neighbors: [USMapNodeId.MS, USMapNodeId.AR, USMapNodeId.MO, USMapNodeId.KY, USMapNodeId.VA, USMapNodeId.NC, USMapNodeId.GA, USMapNodeId.AL],
  },
  [USMapNodeId.TX]: {
    color: DieColor.Green,
    neighbors: [USMapNodeId.NM, USMapNodeId.OK, USMapNodeId.AR, USMapNodeId.LA],
  },
  [USMapNodeId.UT]: {
    color: DieColor.Orange,
    neighbors: [USMapNodeId.AZ, USMapNodeId.NV, USMapNodeId.ID, USMapNodeId.WY, USMapNodeId.CO],
  },
  [USMapNodeId.VA]: {
    color: DieColor.Red,
    neighbors: [USMapNodeId.NC, USMapNodeId.TN, USMapNodeId.KY, USMapNodeId.WV, USMapNodeId.PA, USMapNodeId.MD],
  },
  [USMapNodeId.VT]: {
    color: DieColor.Purple,
    neighbors: [USMapNodeId.NY, USMapNodeId.MA, USMapNodeId.NH],
  },
  [USMapNodeId.WA]: {
    color: DieColor.Orange,
    neighbors: [USMapNodeId.OR, USMapNodeId.ID],
  },
  [USMapNodeId.WI]: {
    color: DieColor.Blue,
    neighbors: [USMapNodeId.MN, USMapNodeId.IA, USMapNodeId.IL, USMapNodeId.MI],
  },
  [USMapNodeId.WV]: {
    color: DieColor.Red,
    neighbors: [USMapNodeId.VA, USMapNodeId.KY, USMapNodeId.OH, USMapNodeId.PA],
  },
  [USMapNodeId.WY]: {
    color: DieColor.Green,
    neighbors: [USMapNodeId.CO, USMapNodeId.UT, USMapNodeId.ID, USMapNodeId.MT, USMapNodeId.SD, USMapNodeId.NE],
  },
};