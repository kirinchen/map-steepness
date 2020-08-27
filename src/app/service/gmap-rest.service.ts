import { LocInfo } from './../model/loc-info';

import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  retry
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Path } from '../model/path';
import { Observable } from 'rxjs';
declare var jquery: any;
declare let $: any;
declare let google: any;

@Injectable({
  providedIn: 'root'
})
export class GMapRestService {

  // directionsService = new google.maps.DirectionsService();

  constructor(

  ) { }

  public injectElevation(locs: Array<LocInfo>): void {
    const spLocs = this.splitWaypoints(locs);
    for (const ls of spLocs) {

    }
  }

  public async fetchPaths(locs: Array<LocInfo>): Promise<PathBundle> {
    const spLocs = this.splitWaypoints(locs);
    const ans = new PathBundle();
    for (const blocs of spLocs) {
      if (blocs.length <= 0) { continue; }
      const bd = await this.fetchPathFromGmap(blocs);
      ans.response.push(bd);
      const ps = this.parsePaths(bd);
      ans.paths = ans.paths.concat(ps);
    }
    return ans;
  }

  // private https://developers.google.com/maps/documentation/javascript/elevation


  private parsePaths(bd: any): Array<Path> {
    const ans = new Array<Path>();
    const legs: any[] = bd.routes[0].legs;
    for (const leg of legs) {
      console.log(leg);
      const p = new Path();
      const stl = leg.start_location;
      const edl = leg.end_location;
      p.setStart(new LocInfo(stl.lat(), stl.lng()));
      p.setEnd(new LocInfo(edl.lat(), edl.lng()));
      p.setDistance(leg.distance.value);
      console.log(p);
      ans.push(p);
    }
    return ans;
  }

  private fetchPathFromGmap(points: Array<LocInfo>): Promise<any> {

    const origin = points[0].getLatLng();
    const waypoints = this.genWaypointsPram(points);
    const mode = 'BICYCLING';
    const destination = points[points.length - 1].getLatLng();
    // const link = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + origin + '&waypoints=' + waypoints + '&mode=' + mode + '&destination=' + destination + '&key=' + key;

    const request = {
      origin,
      destination,
      travelMode: mode,
      waypoints
    };
    return new Promise((rev, rej) => {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(request, (response, status) => {
        if (status === 'OK') {
          rev(response);
        } else {
          rej(response);
        }
      });
    });

  }




  private genWaypointsPram(points: Array<LocInfo>): Array<Waypoint> {
    const ans = new Array<Waypoint>();
    for (let i = 1; i < points.length - 1; i++) {
      ans.push(points[i].getWaypoint());
    }
    return ans;
  }

  private splitWaypoints(points: Array<LocInfo>): Array<Array<LocInfo>> {
    let ans = new Array<Array<LocInfo>>();
    ans.push([]);
    let arIdx = 0;
    for (let i = 1; i < points.length - 1; i++) {
      if (ans.length > 3) {
        break;
      }
      const oary = ans[arIdx];
      oary.push(points[i]);
      if (oary.length >= 25) {
        arIdx++;
        ans.push([]);
      }

    }

    return ans;
  }

}

export class PathBundle {
  public paths: Array<Path> = new Array<Path>();
  public response: Array<any> = Array<any>();
}


export class Waypoint {
  location: any;
  stopover: boolean;
}
